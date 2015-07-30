angular.module('controllers')
    .controller('SliderImageAddController', ['$scope','$location','$http','$route','$routeParams','ImageService',
        function ($scope,  $location, $http, $route, $routeParams, ImageService) {
            $scope.slide = {
                images: [],
                description: null
            };
            $scope.addSlide = function(slide) {
                var form = collectFormData();

               ImageService.add(form).then(function (data) {
                    if (data.data.status) {

                        $location.path('#/')
                    }
                    else {
                        if (data.data.errors)
                            for (var error  in data.data.errors)
                                alert(error + " " + data.data.errors[error])
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
                        console.log(id,index)
                        var removedImage = $scope.slide.images.splice(index, 1)[0];
                }
            };

            var collectFormData = function() {
                var form = new FormData();

                form.append('description', $scope.slide.description);
                // gather images and files
                $scope.slide.images.forEach(function(image, index) {
                   if (image.fresh) {
                        form.append('images[]', image.file);
                    }
                });
                form.append('count', $scope.slide.images.length);
                return form;
            };


        }]);