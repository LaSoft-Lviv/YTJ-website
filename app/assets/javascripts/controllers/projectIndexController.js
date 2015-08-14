angular.module('controllers')
    .controller('ProjectIndexController', ['$scope', '$rootScope', '$translate', '$location','$http','$route','$routeParams','ProjectService',
        function ($scope, $rootScope, $translate, $location, $http, $route, $routeParams, ProjectService) {

            $scope.projects = [];
            ProjectService.getAllProjects().then(function (response) {
                console.log(response)
                $scope.projects = response.data.projects

            });

        $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

            $scope.deleteProject= function(id){
                ProjectService.remove(id).then(function(data) {
                        $location.url('/projects');
                        Materialize.toast($scope.succesMessage, 3000);
                    }
                );
            };

        }]);