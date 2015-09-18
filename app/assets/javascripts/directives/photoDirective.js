angular.module("ytj")
    .directive("photoDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
                scope.$on("dataLoad", function () {
                    var attrValue = attributes["photoDirective"];
                    var albums = scope[attrValue];
                    var containerPhoto = $('.container-photo');

                    for (var i = 0; i < albums.length; i++) {
                        containerPhoto.append('<div class="photo"><a href="https://www.flickr.com/photos/'+
                        albums[i].user_id+'/sets/'+albums[i].id+'" target="_blank" class="photo-link">'+ 
                        '<img class="img-photo" src="'+albums[i].url+'">'+
                        '<a href="https://www.flickr.com/photos/'+albums[i].user_id+'/sets/'+albums[i].id+
                        '" target="_blank" class="photo-description">'+albums[i].title+' More...</a></a></div>');
                    };
                    
                    $('.container-photo').slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true,
                        autoplay: true,
                        autoplaySpeed: 5000
                    });
                })
            },
            restrict: "EACM",
            templateUrl: "photoTemplate.html"
        }
    }]);