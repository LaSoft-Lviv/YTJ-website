/*angular.module("directives")
    .directive("youtubeEmbed", [ function(){
        debugger;
        return {
            restrict: 'E',
            scope: {
                id: '@id',
                width:'@width',
                height: '@height',
                src: '@image'
            },
            link: function(scope, element, attrs) {
                 attrs.$observe('id', function(id) {
                    if(id) {
                        var h = (attrs.height) ? attrs.height : 390;
                        var w = (attrs.width) ? attrs.width : 640;
                        element.on('click', function() {
                            debugger;
                            var v = '<iframe type="text/html" width="'+w+'" style="width:'+w+';height:'+h+'" src="http://youtube.com/embed/'+id+'?autoplay=1" frameborder="1" allowfullscreen />'
                            var newHTML =	'<div>' + v + '</div>';
                            element.html(newHTML);
                        });
                    }
                });
            }
    }
}]);*/