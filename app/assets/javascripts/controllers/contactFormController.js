"use strict"

angular.module('controllers')
    .controller('ContactFormController', ['$scope', '$rootScope', '$translate','ContactFormService',
        function ($scope, $rootScope, $translate, ContactFormService) {

            $scope.contact_mail = {
                name: "",
                email: "",
                theme: "",
                text: ""
            };

        $translate('ADDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('ADDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

            $scope.submitContact = function() {
                debugger;
            var form = collectFormData();
            console.info(form);
            ContactFormService.sendMail(form).then(function (data) {

                if (data.status) {
                   Materialize.toast($scope.succesMessage, 3000);
                } else {
                    alert('Message doesn\'t  send');
                    if (data.errors) {
                        for (var error  in data.errors) {
                            alert(error + " " + data.errors[error])
                        }
                    }
                  }
                })
            };

        var collectFormData = function() {
                var form = new FormData();

                form.append('locale', $rootScope.currentLang);
                form.append('name', $scope.contact_mail.name);
                form.append('email', $scope.contact_mail.email);
                form.append('subject', $scope.contact_mail.theme);
                form.append('message', $scope.contact_mail.text);

                alert($scope.contact_mail.name);

                return form;
            };

        $scope.getErrorName = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  //return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть правильну назву";
                  } else if (error.minlength) {
                      return "Назва повинно містити не менше 3 символів";
                    } else if (error.maxlength) {
                        return "Назва повинно містити не більше 16 символів";
                      }
            }
        }

        $scope.getErrorEmail = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  //return "Поле не повинно бути пустим";
                } else if (error.email) {
                    return "Введіть правильний email";
                  }
            }
        }

    }]);
