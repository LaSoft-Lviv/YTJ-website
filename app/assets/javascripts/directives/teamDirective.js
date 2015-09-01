angular.module("ytj")
    .directive("teamDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
            },
            restrict: "EACM",
            templateUrl: "teamTemplate.html"
        }
    }]);