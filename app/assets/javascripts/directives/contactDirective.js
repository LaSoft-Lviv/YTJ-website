angular.module("ytj")
    .directive("contactDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
            },
            restrict: "EACM",
            templateUrl: "contactTemplate.html"
        }
    }]);