angular.module('controllers')
  .controller('HomeController', ['$scope', '$rootScope', '$translate', '$interval', '$timeout', '$location', '$translate', 'DataService','SessionService','ProjectService', 'TeamService',
                                function ($scope, $rootScope, $translate, $interval, $timeout, $location, $translate, DataService, SessionService, ProjectService, TeamService) {

        $scope.signedIn = SessionService.isAuthenticated;

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects;
            $scope.team = data.team;
            $scope.slides = data.slides;
            $scope.playListItems = data.playlistItems;
            $rootScope.$broadcast("dataLoad");
            $rootScope.currentLang = $translate.use();

            console.log(data.slides);

        $translate(['MESSAGENAME', 'MESSAGEEMAIL', 'MESSAGETHEME', 'MESSAGETEXT', 'MESSAGESEND']).then(function (translations) {
            $scope.nameMessage = translations.MESSAGENAME;
            $scope.emailMessage = translations.MESSAGEEMAIL;
            $scope.themeMessage = translations.MESSAGETHEME;
            $scope.textMessage = translations.MESSAGETEXT;
            $scope.sendMessage = translations.MESSAGESEND;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate(['MESSAGENAME', 'MESSAGEEMAIL', 'MESSAGETHEME', 'MESSAGETEXT', 'MESSAGESEND']).then(function (translations) {
            $scope.nameMessage = translations.MESSAGENAME;
            $scope.emailMessage = translations.MESSAGEEMAIL;
            $scope.themeMessage = translations.MESSAGETHEME;
            $scope.textMessage = translations.MESSAGETEXT;
            $scope.sendMessage = translations.MESSAGESEND;
            });
        });

            $('.container-photo').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 3000,
                touchMove: false,
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });

            $('.container-video').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 3000,
                touchMove: false,
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
    
    $scope.nextLink = function(){
        debugger;

        //console.log($('.carousel-description span').text());

        var currentActiveImage = $(".image-shown");
        var nextActiveImage = currentActiveImage.next();

        var currentActiveDescription = $(".description-shown");
        var nextActiveDescription = currentActiveDescription.next();
        
        console.log(nextActiveDescription.text());
       /* if(nextActiveDescription.text()) {
            $('.carousel-description').removeClass('container-description-hidden').addClass('container-description-shown');
        } else {
            $('.carousel-description').removeClass('container-description-shown').addClass('container-description-hidden');
        }*/

        var currentActiveIndicator = $(".carousel-indicators-main li.active");
        var nextActiveIndicator = currentActiveIndicator.next();

        if(nextActiveImage.length == 0) {
            nextActiveImage = $(".carousel-inner-main img").first();
        }

        if(nextActiveDescription.length == 0) {
            nextActiveDescription = $(".carousel-description span").first();
        }

        if(nextActiveIndicator.length == 0) {
            nextActiveIndicator = $(".carousel-indicators-main li").first();
        }

        currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10);
        nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);
        $(".carousel-inner img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);

        currentActiveDescription.removeClass("description-shown").addClass("description-hidden");
        nextActiveDescription.addClass("description-shown").removeClass("description-hidden");

        currentActiveIndicator.removeClass("active");
        nextActiveIndicator.addClass("active");

        if(nextActiveDescription.text()) {
            $('.carousel-description').fadeIn(4000);
            /*function carouselDescriptionHidden() {
                $('.carousel-description').fadeOut(2000);
            }*/
            $timeout(function() {
                $('.carousel-description').fadeOut(2000);
            }, 4000);
            

        } else {
            $('.carousel-description').fadeOut();
        }

    };

    $scope.previousLink = function(){

        var currentActiveImage = $(".image-shown");
        var nextActiveImage = currentActiveImage.prev();

        var currentActiveDescription = $(".description-shown");
        var nextActiveDescription = currentActiveDescription.prev();

        var currentActiveIndicator = $(".carousel-indicators-main li.active");
        var nextActiveIndicator = currentActiveIndicator.prev();

        if(nextActiveImage.length == 0) {
            nextActiveImage = $(".carousel-inner-main img").last();
        }

        if(nextActiveDescription.length == 0) {
            nextActiveDescription = $(".carousel-description span").last();
        }

        if(nextActiveIndicator.length == 0) {
            nextActiveIndicator = $(".carousel-indicators-main li").last();
        }

        currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10);
        nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);
        $(".carousel-inner-main img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);

        currentActiveDescription.removeClass("description-shown").addClass("description-hidden");
        nextActiveDescription.addClass("description-shown").removeClass("description-hidden");

        currentActiveIndicator.removeClass("active");
        nextActiveIndicator.addClass("active");

    };

       //$interval($scope.nextLink, 5000);


        });




}]);
