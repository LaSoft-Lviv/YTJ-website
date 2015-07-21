angular.module('controllers')
    .controller('SignupController', ['$scope','$location','UserService', function ($scope,  $location, UserService) {


        $scope.register = function(user){

            console.log('register')
            UserService.register(user).then(function (data) {
console.log(data);
             if (data.data.status== "success") {

                    alert("OK");
                } else {
                    alert("NOT OK");
                }
              //  callback(response);
            });
        }

    }]);
