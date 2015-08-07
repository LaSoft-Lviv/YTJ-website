angular.module("ytj")
    .directive("scrollDirective", ['ScrollService', function (ScrollServise) {
        return {
            restrict: "EACM",
            link: function (scope, element, attributes) {

                var elem = element.find(".my-btn-floating");

                window.onscroll = function() {
                    var scrolledHeight = $(window).scrollTop();
                    if(scrolledHeight  > 100) {
                        elem.fadeIn();
                    } else if(scrolledHeight < 100) {
                        elem.fadeOut();
                      }
                }
            }
        }
}]);
