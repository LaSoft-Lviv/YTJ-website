angular.module('controllers')
    .controller('SignupController', ['$scope', '$rootScope', '$location','UserService', 'ngDialog', '$timeout', function ($scope, $rootScope, $location, UserService, ngDialog, $timeout) {
        $scope.registerUser = function(user) {
            UserService.register(user).then(function (response) {
                
                $scope.data = response;
                $scope.errors = response.data.errors;
                    if ($scope.data.data.user) {
                        Materialize.toast('Вас успішно зареєстровано!', 3000);
                        $location.path('/signin');
                    } else { 
                        $rootScope.$broadcast("userSignupEventSuccess");
                      }
                
            })
        }

        $scope.userNamePattern = new RegExp("^[a-zA-ZА-Яа-яІі ,.'-]+$", "i");

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
