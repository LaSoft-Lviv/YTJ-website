angular.module('controllers')
    .controller('ProjectIndexController', ['$scope','$location','$http','$route','$routeParams','ProjectService',
        function ($scope,  $location, $http, $route, $routeParams, ProjectService) {

            $scope.projects = [];
            ProjectService.getAllProjects().then(function (response) {
                console.log(response)
                $scope.projects = response.data.projects

            });



            $scope.deleteProject= function(id){
                ProjectService.remove(id).then(function(data) {
                        $location.url('/projects');
                        Materialize.toast('Проект успішно видалено!', 3000);
                    }
                );
            };

        }]);