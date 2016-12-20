/**
 * Created by yaroslav on 12/9/16.
 */
'use strict';
var app = angular.module('admin', []);

app.controller('adminCtrl', function($scope){

    
});
app.directive('adminMenu', function(){
    return {
        restrict: "E",
        templateUrl: "templates/admin/menu.tpl.html",
        controller: ['$http', '$scope', function($http, $scope){
            
            this.menu = [
                {title:'Blog', subitems:[
                    {title: 'Articles', href:'/admin/articles'},
                    {title: 'Tags'},
                    {title: 'Abc'}
                ]},
                {title:'Video'},
                {title:'Resume'}
            ]
        }],
        controllerAs: 'amCtrl'
    };
});