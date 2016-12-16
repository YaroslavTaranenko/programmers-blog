/**
 * Created by yaroslav on 12/9/16.
 */
'use strict';
var app = angular.module('admin', []);

app.controller('adminCtrl', function($scope){
    $scope.menu = [
        {title:'Blog', subitems:[
            {title: 'Articles'},
            {title: 'Tags'},
            {title: 'Abc'}
        ]},
        {title:'Video'},
        {title:'Resume'}
    ]
});