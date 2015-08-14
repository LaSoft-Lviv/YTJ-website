angular.module('controllers')
    .controller('TeamMemberIndexController', ['$scope','$location','$http','TeamService',
        function ($scope,  $location, $http,  TeamService) {

            $scope.teamMembers = [];
            TeamService.getAllTeamMembers().then(function (response) {
                $scope.teamMembers = response.data.team;

            });

            $scope.deleteTeamMember= function(id){
                TeamService.remove(id).then(function(data) {
                        $location.path('/team');
                        Materialize.toast('Члена команди успішно видалено!', 3000);
                    }
                );
            };

        }]);