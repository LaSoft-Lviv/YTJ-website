angular.module('controllers')
    .controller('SessionController', [ '$rootScope', '$scope', '$location','SessionService', function($rootScope, $scope, $location, SessionService) {
        $scope.signedIn = SessionService.isAuthenticated;

        $scope.submitLogin = function(loginData){
              SessionService.login(loginData).then(function(data) {

                  $scope.currentUser = SessionService.currentUser
                  localStorage.setItem('auth_token',  $scope.currentUser.auth_token);
                  //console.log( localStorage.getItem('auth_token'));

                  $('#username').text($scope.currentUser.name)
            });
        }


        $scope.currentUser=null;

        $scope.submitLogout = function(){
            //console.log(currentUser)
            SessionService.logout('#/').then(function(data) {


            });
        }
    }]);
