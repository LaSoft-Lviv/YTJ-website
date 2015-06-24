angular.module('controllers')
    .controller('SignupController', ['$scope','$location','UserService', function ($scope,  $location, UserService) {

        $scope.user =
        {
          name:'',
          email:'',
          password:'',
          password_confirmation: ''

        };

        $scope.register = function(){

            UserService.register($scope.user).then(function (data) {

             if (data.data.status== "success") {

                    alert("OK");
                } else {
                    alert("NOT OK");
                }
              //  callback(response);
            });
        }

        $scope.update = function(){

        }

    }]);
