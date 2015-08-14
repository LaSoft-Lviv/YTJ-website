angular.module('controllers')
    .controller('IndexController', ['$scope', '$location', 'ScrollService', '$window', '$translate', function ($scope, $location, ScrollService, $window, $translate) {

        $scope.gotoElement = function (eID){
            //$location.hash();
            ScrollService.scrollTo(eID);
        };

        $scope.gotoTop = function () {
            ScrollService.scrollTop();
        };

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    }]);