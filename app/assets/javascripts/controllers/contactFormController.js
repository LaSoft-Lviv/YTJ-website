"use strict"

angular.module('controllers')
    .controller('ContactFormController', ['$scope','ContactFormService',
                                 function ($scope,ContactFormService) {
        $scope.submitContact = function(contact_mail) {

            ContactFormService.sendMail(contact_mail).then(function (data) {

                if (data.status) {
                   alert('Message is send')
                }
                else {
                    alert('Message doesn\'t  send')
                    if (data.errors)
                        for (var error  in data.errors)
                            alert(error + " " + data.errors[error])

                }
            });

        }

    }]);
