angular.module('templates', ['templates/main.tpl.html']);

angular.module("templates/main.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/main.tpl.html",
    "<h1>Main</h1>");
}]);
