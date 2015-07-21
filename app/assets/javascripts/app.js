"use strict"

var app = angular.module('ytj', [
    'angularFileUpload',
    'ngResource',
    'ngRoute',
    'directives',
    'templates',
    'controllers',
    'services'

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
    var interceptor = ['$q', '$location', '$rootScope',  function($q, $location, $rootScope) {
        return {
            'responseError': function(rejection) {
                if (rejection.status == 403) {
                    $rootScope.$broadcast('auth-not-authorized');
                    window.history.back();
                  //  messageCenterService.add('danger', 'You are not authorized to perform that action.', { timeout: 2000, html: true, status: messageCenterService.status.permanent });
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        };
    }];

    $httpProvider.interceptors.push(interceptor);
}]);



app.config(['$routeProvider','$locationProvider',  function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController',
        })
        .when('/signup', {
            templateUrl: 'account/signup.html',
            controller: 'SignupController',
        })
        .when('/settings', {
            templateUrl: 'account/update.html',
            controller: 'UpdateAccountController',
        })
        .when('/login', {
            templateUrl: 'session/login.html',
            controller: 'SessionController',

        })
        .when('/project/edit', {
            templateUrl: 'project/edit.html',
            controller: 'ProjectEditController',

        })
        .when('/project', {
            templateUrl: 'project/add.html',
            controller: 'ProjectAddController',

        })
        .when('/team/add', {
            templateUrl: 'team/add.html',
            controller: 'TeamAddController',

        })
    .   otherwise({ redirectTo: '/' });
}]);
angular.module('directives',[]);
angular.module('controllers', []);
angular.module('services', []);
