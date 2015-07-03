angular.module('controllers')
  .controller('HomeController', ['$scope','$location','DataService', function ($scope,  $location, DataService) {

        console.log("home")

        $scope.titleProject="Projects";

        DataService.getAll().then(function (data) {
            $scope.projects = data.projects
            $scope.team = data.team
            console.log($scope.projects)
            console.log($scope.team)

        });

}]);
