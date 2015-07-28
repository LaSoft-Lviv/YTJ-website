angular.module('controllers')
    .controller('UpdateAccountController', [ '$rootScope', '$scope', '$location','UserService', function($rootScope, $scope, $location, UserService) {

        $scope.update = function (user) {
            UserService.update(user).then(function (data) {
            if(data.data && data.data.status && data.data.status=='success')
                {
                    $location.path('/#');
                }
                else
                {
                    alert(data.errors)
                }
                //$('#username').text($scope.currentUser.name)
            });
        }
    }]);
