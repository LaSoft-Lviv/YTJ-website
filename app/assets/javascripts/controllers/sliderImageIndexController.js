angular.module('controllers')
    .controller('SliderImageIndexController', ['$scope','$location','$http','$route','$routeParams','ImageService',
        function ($scope,  $location, $http, $route, $routeParams, ImageService) {

            $scope.slides = [];
            ImageService.getAll().then(function (response) {
                console.log(response)
                $scope.slides = response.data.slides

            });

            $scope.remove = function(id,index){
                ImageService.remove(id).then(function(response) {
                        console.log(response);
                       $scope.slides = response.slides
                        $location.url('/slides');
                    }
                );
                console.log(id,index)
            }

}]);