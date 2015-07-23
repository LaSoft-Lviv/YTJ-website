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

        $scope.userNamePattern = new RegExp("^[a-z ,.'-]+$", "i");

        $scope.getErrorName = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть правильне ім'я";
                  } else if (error.minlength) {
                      return "Ім'я повинно містити не менше 3 символів";
                    } else if (error.maxlength) {
                        return "Ім'я повинно містити не більше 16 символів";
                      }
            }
        }

        $scope.getErrorEmail = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Поле не повинно бути пустим";
                } else if (error.email) {
                      return "Введіть правильний email";
                    }
            }
        }

        $scope.getErrorPassword = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Поле не повинно бути пустим";
                } else if (error.minlength) {
                    return "Пароль повинен містити не менше 4 символів";
                    }
            }
        }

        $scope.getErrorConfirm = function () {
         return "Паролі повинні співпадати!";
        }

}]);
