angular.module('controllers')
    .controller('SliderImageIndexController', ['$scope', '$rootScope', '$translate', '$location','$http','$route','$routeParams','ImageService',
        function ($scope, $rootScope, $translate, $location, $http, $route, $routeParams, ImageService) {

            $scope.slides = [];
            ImageService.getAll().then(function (response) {
                console.log(response)
                $scope.slides = response.data.slides

            });

        $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

            $scope.remove = function(id,index){
                ImageService.remove(id).then(function(response) {
                        $scope.slides = response.slides;
                        $location.url('/slides');
                        Materialize.toast($scope.succesMessage, 3000);
                    }
                );
                console.log(id,index)
            }

}]);