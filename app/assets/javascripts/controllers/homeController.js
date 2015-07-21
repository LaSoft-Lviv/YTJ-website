angular.module('controllers')
  .controller('HomeController', ['$scope','$location','DataService','SessionService','ProjectService', function ($scope,  $location, DataService,SessionService, ProjectService) {

        $scope.signedIn = SessionService.isAuthenticated;


        $scope.titleProject="Проекти";
        $scope.titleTeam="Команда"

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects
            $scope.team = data.team
           // console.log($scope.projects)
            console.log($scope.team);

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
           console.log(id)

           ProjectService.remove(id).then(function(data) {
                   $location.url('#/');
               }
           );
        };

}]);
