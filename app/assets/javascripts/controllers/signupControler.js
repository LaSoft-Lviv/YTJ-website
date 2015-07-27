angular.module('controllers')
   /* .directive("SignupDirective", function () {
                function addClassInput (scope, element, attributes) {
                var elements = element.find("input[type='email']");
                elements.addClass("input-after-error"); 
            }
        })*/

    .controller('SignupController', ['$scope', '$rootScope', '$location','UserService', function ($scope, $rootScope, $location, UserService) {

$scope.colors = {art:[1,2]};

/*$scope.$on("userSignupEventError", function (event, attr) {
    debugger;
                    alert('yes');
                    });*/
        $scope.registerUser = function(user) {
            debugger;
            /* $rootScope.$broadcast("userSignupEventError");*/
            UserService.register(user).then(function (response) {
                $scope.errors = response.data.errors;
                //console.log('errors');
                console.info(response);
                console.info($scope.errors);
                if (response.data.status == "success") {
                    alert("Вас успішно зареєстровано!");
                    $location.path('/signin');
                } else { 
                    alert("Вас не було зареєстровано!");
                        if (response.data.errors) {
                            for (error in response.data.errors) {
                                alert(error + " " + response.data.errors[error]);
                                if (error == "email") {
                                    alert(error);
                                }
                            } 
                        } else {
                            alert(response.statusText);
                          }
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
