angular.module('controllers')
    .controller('IndexController', ['$scope', '$location', 'ScrollService', '$window', function ($scope, $location, ScrollService, $window) {
        
        $scope.gotoElement = function (eID){
        //$location.hash();
        	ScrollService.scrollTo(eID);
        };

        $scope.gotoTop = function () {
        	ScrollService.scrollTop();
        };
}]);