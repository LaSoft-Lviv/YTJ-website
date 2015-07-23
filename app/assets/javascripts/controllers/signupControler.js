angular.module('controllers')
    .controller('SignupController', ['$scope','$location','UserService', function ($scope,  $location, UserService) {


        $scope.register = function(user){
           UserService.register(user).then(function (data) {
                console.log(data);
             if (data.data.status== "success") {
                    alert("OK");
                    $location.path('#/')
                } else {
                    alert("NOT OK");
                 if (data.data.errors)
                     for (error  in data.data.errors)
                         alert(error + " " + data.data.errors[error])
                 else
                     alert(data.statusText)
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
