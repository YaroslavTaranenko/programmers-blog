var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/:p1', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/:p1/:p2', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/:p1/:p2/:p3', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
