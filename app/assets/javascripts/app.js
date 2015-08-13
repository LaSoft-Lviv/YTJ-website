"use strict"

var app = angular.module('ytj', [
    'angularFileUpload',
    'ngResource',
    'ngRoute',
    'ngCookies',
    'ngStorage',
    'pascalprecht.translate',
    'directives',
    'templates',
    'controllers',
    'services',
    'ngDialog'

]);
var roles = {
    superUser: 0,
    admin: 1,
    user: 2
};

var routeForUnauthorizedAccess = '/#';

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

app.config(function($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');

    $translateProvider.useStaticFilesLoader({
        prefix: '/locales/',
        suffix: '.json'
    });
});

app.config(['$routeProvider','$locationProvider',  function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/signup', {
            templateUrl: 'account/signup.html',
            controller: 'SignupController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.user,roles.admin,roles.superUser]);
                }
            }
        })
        .when('/admin/profile/edit', {
            templateUrl: 'account/edit.html',
            controller: 'UpdateAccountController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/signin', {
            templateUrl: 'session/signin.html',
            controller: 'SessionController',
            resolve: { //Here we would use all the hardwork we have done
                //above and make call to the authorization Service
                //resolve is a great feature in angular, which ensures that a route
                //controller (in this case superUserController ) is invoked for a route
                //only after the promises mentioned under it are resolved.
                permission: function(AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin,roles.user,roles.superUser]);
                }
            }

        })
        .when('/projects/:id/edit', {
            templateUrl: 'project/edit.html',
            controller: 'ProjectEditController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }

        })
        .when('/projects/new', {
            templateUrl: 'project/add.html',
            controller: 'ProjectAddController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/team/new', {
            templateUrl: 'team/add.html',
            controller: 'TeamAddController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }

        })
        .when('/team/:id/edit', {
            templateUrl: 'team/edit.html',
            controller: 'TeamEditController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/slides/new', {
            templateUrl: 'slider/add.html',
            controller: 'SliderImageAddController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        }).
        when('/slides/:id/edit', {
            templateUrl: 'slider/edit.html',
            controller: 'SliderImageEditController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/slides', {
            templateUrl: 'slider/index.html',
            controller: 'SliderImageIndexController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/team', {
            templateUrl: 'team/index.html',
            controller: 'TeamMemberIndexController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .when('/projects', {
            templateUrl: 'project/index.html',
            controller: 'ProjectIndexController',
            resolve: {
                permission: function (AuthorizationService, $route) {
                    return AuthorizationService.permissionCheck([roles.admin]);
                }
            }
        })
        .otherwise({ redirectTo: '/' });
}]);

angular.module('directives',[]);
angular.module('controllers', []);
angular.module('services', []);
