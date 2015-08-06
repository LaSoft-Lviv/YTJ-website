angular.module('controllers')
  .controller('HomeController', ['$scope','$location','DataService','SessionService','ProjectService', 'TeamService',
                                function ($scope,  $location, DataService, SessionService, ProjectService, TeamService, ScrollService) {

        $scope.signedIn = SessionService.isAuthenticated;

        $scope.titleProject="Проекти";
        $scope.titleTeam="Команда"

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects;
            $scope.team = data.team;
            $scope.slides = data.slides;
            $scope.playListItems = data.playlistItems;

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


        });

        $scope.deleteProject= function(id){
          ProjectService.remove(id).then(function(data) {
                   $location.url('/');
               }
           );
        };

        $scope.deleteTeamMember= function(id){
            TeamService.remove(id).then(function(data) {
                    $location.url('/');
                }
            );
        };

}]);
