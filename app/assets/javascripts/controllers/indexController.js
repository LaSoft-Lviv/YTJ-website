angular.module('controllers')
    .controller('IndexController', ['$scope', '$location', 'ScrollService', function ($scope, $location, ScrollService) {
        
        $scope.gotoElement = function (eID){
        //$location.hash();
        ScrollService.scrollTo(eID);
        };
}]);