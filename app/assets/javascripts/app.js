'use strict'
console.log('app')
var app = angular
    .module('ytj', [
        'templates',
        'services',
        'controllers',
        'ngAnimate',
        'ngRoute',
        'ngResource'
    ]);

app.config(['$httpProvider', function($httpProvider){
    var interceptor = ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
        return {
            'responseError': function(rejection) {
                if (rejection.status == 404) {
                    $rootScope.$broadcast('record-not-found');
                    $location.path('/');
                    return rejection;
                }
                return $q.reject(rejection);
            }
        };
    }];

    $httpProvider.interceptors.push(interceptor);
}]);

app.config(['$httpProvider', function($httpProvider){
    var interceptor = ['$q', '$location', '$rootScope', 'messageCenterService', function($q, $location, $rootScope, messageCenterService) {
        return {
            'responseError': function(rejection) {
                if (rejection.status == 403) {
                    $rootScope.$broadcast('auth-not-authorized');
                    window.history.back();
                    messageCenterService.add('danger', 'You are not authorized to perform that action.', { timeout: 2000, html: true, status: messageCenterService.status.permanent });
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        };
    }];
    $httpProvider.interceptors.push(interceptor);
}]);


app.config(['$routeProvider',  function ($routeProvider) {
    console.log("signup");
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController',
            data: {
                authorizedRoles: Permissions.access.open
            }
        })
        .when('/signup', {
            templateUrl: 'accounts/signup.html',
            controller: 'AccountSignupController',
            data: {

            }
        })
        .otherwise({redirectTo: '/'});
}]);
