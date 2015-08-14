angular.module('controllers')
    .controller('UpdateAccountController', [ '$rootScope', '$scope', '$location','UserService','SessionService',
        function($rootScope, $scope, $location, UserService, SessionService) {
        
        $scope.user = {};

        UserService.edit().then(function(data) {
            $scope.user.name = data.name;
            $scope.user.email = data.email;
        });

        $scope.update = function (user) {
            UserService.update(user).then(function (response) {
                if (response.data.status) {
                    Materialize.toast('Профіль - оновлено!', 3000);
                    SessionService.setUserName($scope.user.name);
                    $('#username').text($scope.user.name);
                    $location.path('#/');
                } else {
                    if (response.data.errors) {
                        console.info(response.data.errors);
                        for (var error  in response.data.errors) {
                            alert(error + " " + response.data.errors[error]);
                        }
                    }
                    $scope.errors = response.data.errors;
                  }

            });
        }

        $scope.getErrorName = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.minlength) {
                    return "Ім'я має містити не менше 3 символів";
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
