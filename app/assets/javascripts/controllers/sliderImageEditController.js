angular.module('controllers')
    .controller('SliderImageEditController', ['$scope', '$rootScope', '$translate', '$location','$http','$route','$routeParams','ImageService',
        function ($scope, $rootScope, $translate,  $location, $http, $route, $routeParams, ImageService) {

            $scope.slide = { };

            var params = $route.current.params;
            
            ImageService.edit(params).then(function(data) {
                $scope.slide.image = data.image;
                $scope.slide.description = data.description;
            });

            $translate('UPDATEMESSAGE').then(function (succesMessage) {
                $scope.succesMessage = succesMessage;
            });

            $rootScope.$on('$translateChangeSuccess', function () {
                $translate('UPDATEMESSAGE').then(function (succesMessage) {
                $scope.succesMessage = succesMessage;
                });
            });

            $scope.update = function() {
                var form = collectFormData();
                ImageService.update(form, params).then(function(data) {
                    if (data.status) {
                        $location.path('/slides');
                         Materialize.toast($scope.succesMessage, 3000);
                    }  else if(data.errors) {
                        for (var error  in data.errors) {
                            Materialize.toast(error + " " + data.errors[error], 3000);
                        }
                        $scope.errors = data.errors;
                    }
                });
            };

            $scope.slideImage = {
                add: function(file) {
                    if (file.type.match('image.*')) {;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            $scope.slide.image = {id: (new Date()).getTime(), title: file.name,
                                                src: event.target.result, file: file, fresh: true};
                            $scope.$apply();
                        };
                        reader.readAsDataURL(file);
                    }
                },
                remove: function (id, index) {
                    $scope.slide.image = null;
                }
            };

            var collectFormData = function() {
                var form = new FormData();
                if($scope.slide.description)
                form.append('locale', $rootScope.currentLang);
                form.append('description', $scope.slide.description);
                if ($scope.slide.image.fresh) {
                    form.append('image', $scope.slide.image.file);
                }
                return form;
            };

}]);