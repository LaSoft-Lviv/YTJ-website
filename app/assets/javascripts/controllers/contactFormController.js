"use strict"

angular.module('controllers')
    .controller('ContactFormController', ['$scope','ContactFormService', function ($scope,ContactFormService) {



        $scope.submitContact = function(contact_mail) {

            ContactFormService.sendMail(contact_mail).then(function (data) {

               console.log(data)
            });

        }

    }]);
