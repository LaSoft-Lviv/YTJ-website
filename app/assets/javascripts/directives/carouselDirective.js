angular.module("ytj")
    .directive("carouselDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
      
                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                var previous = element.find(".switch-previous-slide");
                var next = element.find(".switch-next-slide");

                var heightContainer = $window.innerHeight - 150 + "px";
                var loaderContainer = element.find(".container-loader");
                loaderContainer.css("height", heightContainer);

                scope.styleLoader = {
                    position: "absolute",
                    left: "48%",
                    top: "40%",
                };

                scope.$on("dataLoad", function () {

                loaderContainer.hide();
                previous.css("opacity", "1");
                next.css("opacity", "1");

                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                var slidesContainer = element.find(".carousel-inner-main");
                var slidesIndicators = element.find(".carousel-indicators-main");
                var slidesDescription = element.find(".carousel-description");

                var imageClass = 'image-shown';
                var indicatorClass = 'active';
                var descriptionClass = 'description-shown';

                for (var i = 0; i < slides.length; i++) {
                   if (i != 0) {
                        imageClass = 'image-hidden';
                        indicatorClass = '';
                        descriptionClass = 'description-hidden';
                   }
                    slidesContainer.append(angular.element('<img class="'+imageClass+'">').attr("src", slides[i].image.url).addClass("img-responsive-main"));
                    slidesIndicators.append(angular.element('<li class="'+indicatorClass+'">'));
                    slidesDescription.append('<span class="'+descriptionClass+'">'+slides[i].description+"</span>");

                    if (slides[0].description) {
                        slidesDescription.fadeIn(2000);
                    } else {
                        slidesDescription.fadeOut(1000);
                    }
                };
                })
            },
            restrict: "EACM",
            templateUrl: "carouselTemplate.html"
        }
}]);