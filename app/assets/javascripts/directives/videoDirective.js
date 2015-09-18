angular.module("ytj")
    .directive("videoDirective", ['DataService', '$window', function (DataServise, $window) {
        return {
            link: function (scope, element, attributes) {
                scope.$on("dataLoad", function () {
                    var attrValue = attributes["videoDirective"];
                    var videos = scope[attrValue];
                    var containerVideo = $('.container-video');

                    for (var i = 0; i < videos.length; i++) {
                        containerVideo.append('<div class="video-iframe-box">'+
                            '<div class="embed-container" width="'+videos[i].snippet.thumbnails.medium.width+'px"'+ 
                            'height="'+videos[i].snippet.thumbnails.medium.height+'px" id="'+videos[i].contentDetails.videoId+
                            '" image="'+videos[i].snippet.thumbnails.medium.url+'">'+
                            '<div style="position:relative;"><img src="assets/play_button.png" style="position:absolute;'+ 
                            'width:'+videos[i].snippet.thumbnails.medium.width+'px'+';height:'+videos[i].snippet.thumbnails.medium.height+'px; cursor:pointer;" alt="Play" />'+
                            '<img src="'+videos[i].snippet.thumbnails.medium.url+'" style="width:'+videos[i].snippet.thumbnails.medium.width+'px; height:'+videos[i].snippet.thumbnails.medium.height+
                            'px;display:inline;cursor:pointer" alt=""/></div>'+
                            '</div>'+
                            '<p class="video-name-box">'+videos[i].snippet.title+'</p></div>');
                    };

                    $('.embed-container').click(function() {
                        var embed = '<iframe type="text/html" width="'+$(this).attr("width")+'" style="width:'+$(this).attr("width")+';height:'+$(this).attr("height")+'" src="http://youtube.com/embed/'+$(this).attr("id")+'?autoplay=1" frameborder="1" allowfullscreen />'
                        var newHTML =   '<div>' + embed + '</div>';
                        $(this).html(newHTML);
                    });
                    
                    $('.container-video').slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                    });
                    
                   /* $('.container-video').slick({
                      dots: true,
                      infinite: true,
                      speed: 500,
                      fade: true,
                      cssEase: 'linear'
                    });*/

                })
            },
            restrict: "EACM",
            templateUrl: "videoTemplate.html"
      /*      scope: {
                id: '@id',
                width:'@width',
                height: '@height',
                src: '@image'
            }*/
        }
    }]);