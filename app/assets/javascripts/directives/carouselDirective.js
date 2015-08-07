angular.module("ytj")
    .directive("carouselDirective", ['DataService', function (DataServise) {
        return {
            link: function (scope, element, attributes) {

                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                scope.$on("dataLoad", function () {

                var attrValue = attributes["carouselDirective"];
                var slides = scope[attrValue];

                var slidesContainer = element.find(".carousel-inner-main");
                var slidesIndicators = element.find(".carousel-indicators-main");

                var imageClass = 'image-shown';
                var indicatorClass = '';

                for (var i = 0; i < slides.length; i++) {
                   if (i != 0) {
                        imageClass = 'image-hidden';
                        indicatorClass = 'active';
                   }
                   
                    console.log(slides[i].image.url);
                    slidesContainer.append(angular.element('<img class="'+imageClass+'">').attr("src", slides[i].image.url).addClass("img-responsive-main"));
                    slidesIndicators.append(angular.element('<li class="'+indicatorClass+'">'));
                };

                })
             
            },
            restrict: "EACM",
            templateUrl: "carouselTemplate.html",
        }
}]);