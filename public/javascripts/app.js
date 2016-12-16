/**
 * Created by yaroslav on 11/23/16.
 */
'use strict';
var app = angular.module('MyApp', ['templates', 'ui.router', 'ngAnimate', 'admin']);

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
});
app.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
                if(value === true) {
                    console.log('value=',value);
                    //$timeout(function() {
                    element[0].focus();
                    scope[attrs.focusMe] = false;
                    //});
                }
            });
        }
    };
});
app.directive('updateTitle', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            link: function(scope, element) {

                var listener = function(event, toState) {

                    var title = 'Default Title';
                    if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                    $timeout(function() {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            url: '',
            template: '<ui-view></ui-view>',
            data : { pageTitle: 'The Blog: Home' }
        })
        .state('app.home', {
            url: '/',
            templateUrl: 'templates/main.layout.tpl.html',
            data : { pageTitle: 'The Blog: Home' }
        })


        .state('app.admin',{
            url: '/admin',
            templateUrl: 'templates/admin.layout.tpl.html',
            data: { pageTitle: 'The Blog: Admin' }
        })

    ;

    $urlRouterProvider.otherwise("/");
}]);

