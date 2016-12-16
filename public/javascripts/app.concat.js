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

;/**
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
});;angular.module('templates', ['templates/admin.layout.tpl.html', 'templates/main.layout.tpl.html']);

angular.module("templates/admin.layout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/admin.layout.tpl.html",
    "<div id=\"admin\" ng-controller=\"adminCtrl\">\n" +
    "    <header>\n" +
    "        <a href=\"/\">View Site</a>\n" +
    "    </header>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"menu-wrapper\">\n" +
    "            <ul class=\"menu\">\n" +
    "                <li class=\"lvl0\" ng-repeat=\"m in menu\">\n" +
    "                    <a href=\"{{m.href}}\">{{m.title}}</a>\n" +
    "                    <ul class=\"submenu\">\n" +
    "                        <li class=\"lvl1\" ng-repeat=\"sm in m.subitems\">\n" +
    "                            <a href=\"{{sm.href}}\">{{sm.title}}</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"content\">\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <footer>\n" +
    "\n" +
    "    </footer>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/main.layout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/main.layout.tpl.html",
    "<div id=\"header\">\n" +
    "    <div class=\"top-menu\">\n" +
    "        <ul>\n" +
    "            <li><a href>Home</a></li>\n" +
    "            <li><a href>Blog</a></li>\n" +
    "            <li><a href>Contacts</a></li>\n" +
    "            <li><a href>About Us</a></li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"face\">\n" +
    "        <div class=\"logo\">\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"subheader\">\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"sublogo\">\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div style=\"clear: both;\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <h1>Main</h1>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);
