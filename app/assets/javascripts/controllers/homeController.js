angular.module('controllers')
  .controller('HomeController', ['$scope','$location','DataService','SessionService','ProjectService', function ($scope,  $location, DataService,SessionService, ProjectService) {

        $scope.signedIn = SessionService.isAuthenticated;


        $scope.titleProject="Проекти"

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects
            $scope.team = data.team
            console.log($scope.projects)
            console.log($scope.team)

        });
        $scope.deleteProject= function(id){
           console.log(id)

           ProjectService.remove(id).then(function(data) {
                   $location.url('#/');
               }
           );
        };

}]);
