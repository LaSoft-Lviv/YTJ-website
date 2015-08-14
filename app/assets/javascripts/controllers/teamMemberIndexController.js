angular.module('controllers')
    .controller('TeamMemberIndexController', ['$scope', '$rootScope', '$translate', '$location','$http','TeamService',
        function ($scope, $rootScope, $translate,  $location, $http,  TeamService) {

            $scope.teamMembers = [];
            TeamService.getAllTeamMembers().then(function (response) {
                $scope.teamMembers = response.data.team;

            });

        $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('DELETEMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

            $scope.deleteTeamMember= function(id){
                TeamService.remove(id).then(function(data) {
                        $location.path('/team');
                        Materialize.toast($scope.succesMessage, 3000);
                    }
                );
            };

        }]);