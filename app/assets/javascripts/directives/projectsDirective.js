angular.module("ytj")
    .directive("projectsDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
            },
            restrict: "EACM",
            templateUrl: "projectsTemplate.html"
        }
    }]);