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

        $scope.userNamePattern = new RegExp("[a-z]");

        $scope.getError = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Поле не повинно бути пустим";
                } else if (error.email) {
                    return "Введіть правильний email";
                  } else if (error.pattern) {
                      return "Введіть правильне ім'я";
                    }
            }
        }

}]);
