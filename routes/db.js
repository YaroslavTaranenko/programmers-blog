/**
 * Created by yaroslav on 12/20/16.
 */
var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var inspect = require('util').inspect;
var fs = require('fs-extra');
var path = require('path');
var os = require('os');
var mkdirp = require('mkdirp');
var im = require('imagemagick');
var mysql      = require('mysql');
var cn = {
    host     : 'localhost',
    user     : 'root',
    password : '1q2wMy',
    database : 'myblog'
};

/* GET home page. */
router.post('/mysql', function(req, res, next){
    var data = {};
    var connection = mysql.createConnection(cn);

    connection.query(req.body.query, function(err, rows, fields) {
        if (err) throw err;

        data = {rows: rows};
        res.end(JSON.stringify(data));
    });
});
router.post('/insert/tags', function(req, res, next){
    cn.multipleStatements = true;
    var con = mysql.createConnection(cn);

    con.query(
        "SET @genre_id = 0; CALL mb_insert_genre('" + req.body.tag + "', @genre_id); SELECT @genre_id AS id;",
        function(err, rows){
            if(err)throw err;
            //console.log('result: ' + rows);
            res.end(JSON.stringify({id: rows[2][0].id}));
        });
});
router.post('/delete/:table', function(req, res, next){
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1q2wMy',
        database : 'myblog'
    });

    con.query(
        "DELETE from " + req.params.table + " WHERE id = " + req.body.id,
        function(err, rows){
            if(err){
                res.end(JSON.stringify(err));
                throw err;
            }
            //console.log('result: ' + rows);
            res.end(JSON.stringify({result: rows}));
        });
});

router.post('/edit/:table', function(req, res, next){
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1q2wMy',
        database : 'myblog'
    });

    con.query(
        "UPDATE " + req.params.table + " SET " + req.body.params + " WHERE id = " + req.body.id,
        function(err, rows){
            if(err){
                res.end(JSON.stringify(err));
                throw err;
            }
            //console.log('result: ' + rows);
            res.end(JSON.stringify({result: rows}));
        });
});
router.post('/insert/actors', function(req, res, next){
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1q2wMy',
        database : 'myblog',
        multipleStatements: true
    });

    con.query(
        "SET @act_id = 0; CALL mb_insert_actor('" + req.body.fName + "', '" + req.body.lName + "', @act_id); SELECT @act_id AS id;",
        function(err, rows){
            if(err)throw err;
            //console.log('result: ' + rows);
            res.end(JSON.stringify({id: rows[2][0].id}));
        });
});
router.post('/insert/movie', function(req, res, next){
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1q2wMy',
        database : 'myblog',
        multipleStatements: true
    });
    console.log("imdb: " + req.body.imdb);
    console.log("kinopoisk: " + req.body.kinopoisk);
    con.query(
        "SET @mid = 0; CALL mb_insert_movie('" +
        req.body.title + "', " +
        req.body.year + ", '" +
        req.body.country + "', '" +
        req.body.director + "', '" +
        req.body.image + "', '" +
        req.body.imdb + "', '" +
        req.body.kinopoisk + "', '" +
        req.body.description + "', @mid); SELECT @mid AS id;",
        function(err, rows){
            if(err)throw err;
            res.end(JSON.stringify({id: rows[2][0].id}));
        });
});


router.post('/upload', function(req, res, next){
    var idn = '';
    var fName = '';
    var tempFile = '';
    var location = "";
    var size = 0;

    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        tempFile = path.join(os.tmpDir(), Date.now() + filename);
        file.pipe(fs.createWriteStream(tempFile));
        fName = filename;
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        if(fieldname.indexOf('userID') !== -1){
            idn = val;
            //console.log('UserId: ' + idn);
        }
        if(fieldname.indexOf('location') !== -1){
            location = val;
        }
        if(fieldname.indexOf('size') !== -1){
            size = parseInt(val);
        }
    });
    busboy.on('finish', function() {
        if(idn > 0){
            fName = idn + "_" + fName;
            //console.log(fName);
        }
        var targetPath = path.resolve('./public' + location);
        if(location.length === 0){
            return;
            //res.end('Location not specified. ');
        }
        console.log(idn);
        mkdirp(targetPath, function(err){
            if(err)console.log(err);
            if(size > 0){
                im.resize({
                    srcPath: tempFile,
                    dstPath: targetPath + '/' + fName,
                    width:   size
                }, function(err, stdout, stderr){
                    if (err) console.log(err);
                    console.log('resized ' + fName + ' to fit within ' + size);
                    res.end(fName);
                });
            }else{
                fs.rename(tempFile, targetPath + '/' + fName, function(err){
                    if(err)colsole.log(err);
                    res.end('Uploaded ' + targetPath + '/' + fName);
                });
            }
        });
    });
    req.pipe(busboy);
});

module.exports = router;