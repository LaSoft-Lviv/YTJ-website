angular.module('controllers')
    .controller('SliderImageAddController', ['$scope', '$rootScope', '$translate', '$location','$http','$route','$routeParams','ImageService',
        function ($scope, $rootScope, $translate, $location, $http, $route, $routeParams, ImageService) {
            $scope.slide = {
                images: [],
                description: ''
            };

            $translate('ADDMESSAGE').then(function (succesMessage) {
                $scope.succesMessage = succesMessage;
            });

            $rootScope.$on('$translateChangeSuccess', function () {
                $translate('ADDMESSAGE').then(function (succesMessage) {
                $scope.succesMessage = succesMessage;
                });
            });

            $scope.addSlide = function(slide) {
                var form = collectFormData();

                ImageService.add(form).then(function (data) {
                    if (data.data.status) {
                        $location.path('/slides');
                        Materialize.toast($scope.succesMessage, 3000);
                    } else {
                         if (data.data.errors) {
                            for (var error in data.data.errors)
                                Materialize.toast(error + " " + data.data.errors[error], 3000);
                            }
                        }
                })
            };

            $scope.slideImage = {
                add: function(file) {
                    $scope.slide.images=[];
                    if (file.type.match('image.*')) {;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            $scope.slide.images.push({id: (new Date()).getTime(), title: file.name, src: event.target.result, file: file, fresh: true});
                            $scope.$apply();
                        };
                        reader.readAsDataURL(file);
                    }
                },
                remove: function (id, index) {
                    var removedImage = $scope.slide.images.splice(index, 1)[0];
                }
            };

            var collectFormData = function() {
                var form = new FormData();

                form.append('locale', $rootScope.currentLang);
                form.append('description', $scope.slide.description);
    
                $scope.slide.images.forEach(function(image, index) {
                    if (image.fresh) {
                        form.append('images[]', image.file);
                    }
                });
                return form;
            };


        }]);