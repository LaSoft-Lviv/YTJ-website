angular.module('controllers')
  .controller('HomeController', ['$scope', '$rootScope', '$translate', '$interval', '$location', '$translate', 'DataService','SessionService','ProjectService', 'TeamService',
                                function ($scope, $rootScope, $translate, $interval, $location, $translate, DataService, SessionService, ProjectService, TeamService, ScrollService) {

        $scope.signedIn = SessionService.isAuthenticated;

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

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects;
            $scope.team = data.team;
            $scope.slides = data.slides;
            $scope.playListItems = data.playlistItems;
            $rootScope.$broadcast("dataLoad");
            $rootScope.currentLang = $translate.use();


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

        var currentActiveImage = $(".image-shown");
        var nextActiveImage = currentActiveImage.next();

        var currentActiveIndicator = $(".carousel-indicators-main li.active");
        var nextActiveIndicator = currentActiveIndicator.next();

        if(nextActiveImage.length == 0) {
            nextActiveImage = $(".carousel-inner-main img").first();
        }

        if(nextActiveIndicator.length == 0) {
            nextActiveIndicator = $(".carousel-indicators-main li").first();
        }

        currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10);
        nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);
        $(".carousel-inner img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);

        currentActiveIndicator.removeClass("active");
        nextActiveIndicator.addClass("active");

    };

    $scope.previousLink = function(){

        var currentActiveImage = $(".image-shown");
        var nextActiveImage = currentActiveImage.prev();

        var currentActiveIndicator = $(".carousel-indicators-main li.active");
        var nextActiveIndicator = currentActiveIndicator.prev();

        if(nextActiveImage.length == 0) {
            nextActiveImage = $(".carousel-inner-main img").last();
        }

        if(nextActiveIndicator.length == 0) {
            nextActiveIndicator = $(".carousel-indicators-main li").last();
        }

        currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10);
        nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);
        $(".carousel-inner-main img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);

        currentActiveIndicator.removeClass("active");
        nextActiveIndicator.addClass("active");

    };

       $interval($scope.nextLink, 5000);


        });




}]);
