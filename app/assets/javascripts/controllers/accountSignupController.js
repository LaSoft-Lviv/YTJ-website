angular.module('controllers')
   .controller('AccountSignupController', ['$scope','$routeParams' ,'SignupService', function($scope,$routeParams, SignupService) {

    $scope.signup = function(){

        SignupService.signup().then(function(data){

            $scope.request = data.request;
        })
    }
}]);