"use strict"

angular.module("service")
    .service('SignupService',['$http', '$q' , function ($http, $q){
        this.signup = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/signup',
                params: { user_token: "vasyl" }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject('Error while fetching registrations!');
            });

            return deferred.promise;
        };
    }

    ])