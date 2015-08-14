angular.module('controllers')
    .controller('SliderImageAddController', ['$scope','$location','$http','$route','$routeParams','ImageService',
        function ($scope,  $location, $http, $route, $routeParams, ImageService) {
            $scope.slide = {
                images: [],
                description: ''
            };
            $scope.addSlide = function(slide) {
                var form = collectFormData();

                ImageService.add(form).then(function (data) {
                    debugger;
                    console.info(data);
                    if (data.data.status) {
                        Materialize.toast('Слайд успішно додано!', 3000);
                        $location.path('/slides')
                    }  else {
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
                        console.log(id,index)
                        var removedImage = $scope.slide.images.splice(index, 1)[0];
                }
            };

            var collectFormData = function() {
                alert( $scope.slide.description)
                var form = new FormData();
                form.append('description', $scope.slide.description);
                // gather images and files
                $scope.slide.images.forEach(function(image, index) {
                   if (image.fresh) {
                        form.append('images[]', image.file);
                    }
                });
                return form;
            };


        }]);