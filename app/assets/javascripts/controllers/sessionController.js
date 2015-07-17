angular.module('controllers')
    .controller('SessionController', [ '$rootScope', '$scope', '$location','SessionService', function($rootScope, $scope, $location, SessionService) {

       $scope.getCurrentUser = function(){

            var auth_token =  localStorage.getItem('auth_token');
            var name = localStorage.getItem('name');

            if(auth_token && name){
                $scope.currentUser = {
                    auth_token: auth_token,
                    name: name
                };

                SessionService.setUser( $scope.currentUser);
                $('#username').text($scope.currentUser.name);

            }
        };

        $scope.signedIn = function()
        {
            if(!$scope.currentUser)
                 $scope.getCurrentUser();

            return SessionService.isAuthenticated();
        };

        $scope.submitLogin = function(loginData){

              SessionService.login(loginData).then(function(data) {

                  $scope.currentUser = SessionService.currentUser
                  localStorage.setItem('auth_token',  $scope.currentUser.auth_token);
                  localStorage.setItem('name', $scope.currentUser.name)
                  $('#username').text($scope.currentUser.name)
            });
        };

        $scope.submitLogout = function(){
            //console.log(currentUser)
            SessionService.logout('#/').then(function(data) {

                localStorage.setItem('auth_token', "");
                localStorage.setItem('name', "");


            });
        }
    }]);
