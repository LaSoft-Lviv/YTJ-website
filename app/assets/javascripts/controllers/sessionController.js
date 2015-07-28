angular.module('controllers')
    .controller('SessionController', [ '$rootScope', '$scope', '$location','SessionService', function($rootScope, $scope, $location, SessionService) {

        $scope.currentUser = SessionService.getCurrentUser();
        if( $scope.currentUser)
             $('#username').text($scope.currentUser.name)

        $scope.signedIn = function()
        {
           return SessionService.isAuthenticated();
        };

        $scope.submitLogin = function(loginData){

              SessionService.login(loginData).then(function(response) {

                  if (response.data.user) {
                      $scope.currentUser = SessionService.currentUser;
                      $('#username').text($scope.currentUser.name)
                      $location.path('/#');
                  }

            });
        };

        $scope.submitLogout = function(){
            SessionService.logout('/').then(function(data) {
                alert('logout')

            });
        }
    }]);
