angular.module('controllers')
  .controller('HomeController', ['$scope','$location','DataService', function ($scope,  $location, DataService) {

        console.log("home")

        $scope.titleProject="Projects";

        DataService.getAll().then(function (data) {
            $scope.projects = data
            console.log($scope.projects)

        });

}]);