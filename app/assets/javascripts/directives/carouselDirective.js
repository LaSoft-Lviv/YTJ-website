angular.module("ytj")
    .directive("carouselDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
      
                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                var heightContainer = $window.innerHeight - 150 + "px";
                var slidesContainer = element.find(".carousel-inner-main");
                slidesContainer.css("height", heightContainer);

                var loader = element.find(".preloader-wrapper");

                /*var loaderTop = $window.innerHeight / 2;
                var stringLoaderTop = loaderTop + "px";
                
                console.log(stringLoaderTop);*/

                scope.styleLoader = {
                    position: "absolute",
                    left: "48%",
                    top: "40%"
                };

                console.log($window.innerHeight);

                scope.$on("dataLoad", function () {
                
                loader.hide();

                scope.onResize = function() {
                    var heightContainer = $window.innerHeight - 150 + "px";
                    var slidesContainer = element.find(".carousel-inner-main");
                    slidesContainer.css("height", heightContainer);
                }

                //scope.onResize();
                angular.element($window).bind('resize', function() {
                scope.onResize();
                })
            /*    element.on('load', function(){
                    $scope.$apply(function(){
                    scope.onResize();
                    })
                })*/

                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                var slidesContainer = element.find(".carousel-inner-main");
                var slidesIndicators = element.find(".carousel-indicators-main");
                var slidesDescription = element.find(".carousel-description");

                var imageClass = 'image-shown';
                var indicatorClass = 'active';
                var descriptionClass = 'description-shown';

                for (var i = 0; i < slides.length; i++) {
                    debugger;
                   if (i != 0) {
                        imageClass = 'image-hidden';
                        indicatorClass = '';
                        descriptionClass = 'description-hidden';
                   }
                    slidesContainer.append(angular.element('<img class="'+imageClass+'">').attr("src", slides[i].image.url).addClass("img-responsive-main"));
                    slidesIndicators.append(angular.element('<li class="'+indicatorClass+'">'));
                    slidesDescription.append('<span class="'+descriptionClass+'">'+slides[i].description+"</span>");

                    if (slides[0].description) {
                        slidesDescription.fadeIn(4000);
                    } else {
                        slidesDescription.fadeOut(4000);
                    }
        
                };




                })
             
            },
            restrict: "EACM",
            templateUrl: "carouselTemplate.html",
        }
}]);