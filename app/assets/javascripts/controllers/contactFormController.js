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

        $translate('SENDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('SENDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

            $scope.submitContact = function() {
            var form = collectFormData();
            ContactFormService.sendMail(form).then(function (data) {

                if (data.status) {
                   Materialize.toast($scope.succesMessage, 3000);
                } else {
                    if (data.errors) {
                        console.log(data.errors);
                        for (var error in data.errors) {
                            switch(error) {
                                    case 'name':
                                    Materialize.toast(data.errors[error][0], 7000);
                                    break;
                                    case 'email':
                                    Materialize.toast(data.errors[error][0], 7000);
                                    break;
                                    case 'theme':
                                    Materialize.toast(data.errors[error][0], 7000);
                                    break;
                                    case 'text':
                                    Materialize.toast(data.errors[error][0], 7000);
                                    break;
                                }
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
