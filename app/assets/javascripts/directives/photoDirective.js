angular.module("ytj")
    .directive("photoDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
            },
            restrict: "EACM",
            templateUrl: "photoTemplate.html"
        }
    }]);