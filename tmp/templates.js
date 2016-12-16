angular.module('templates', ['templates/admin.layout.tpl.html', 'templates/main.layout.tpl.html']);

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
