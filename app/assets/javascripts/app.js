"use strict"

var app = angular.module('ytj', [
    'angularFileUpload',
    'ngResource',
    'ngRoute',
    'directives',
    'templates',
    'controllers',
    'services',
    'ngDialog'

]);

 app.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);

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
        .when('/admin/profile/edit', {
            templateUrl: 'account/edit.html',
            controller: 'UpdateAccountController',
        })
        .when('/signin', {
            templateUrl: 'session/signin.html',
            controller: 'SessionController',

        })
        .when('/projects/:id/edit', {
            templateUrl: 'project/edit.html',
            controller: 'ProjectEditController',

        })
        .when('/projects/new', {
            templateUrl: 'project/add.html',
            controller: 'ProjectAddController',

        })
        .when('/team/new', {
            templateUrl: 'team/add.html',
            controller: 'TeamAddController',

        })
        .when('/team/:id/edit', {
            templateUrl: 'team/edit.html',
            controller: 'TeamEditController',
        })
        .when('/slides/new', {
            templateUrl: 'slider/add.html',
            controller: 'SliderImageAddController',
        }).
        when('/slides/:id/edit', {
            templateUrl: 'slider/edit.html',
            controller: 'SliderImageEditController'
        })
        .when('/slides', {
            templateUrl: 'slider/index.html',
            controller: 'SliderImageIndexController',
        })
        .otherwise({ redirectTo: '/' });
}]);
angular.module('directives',[]);
angular.module('controllers', []);
angular.module('services', []);
