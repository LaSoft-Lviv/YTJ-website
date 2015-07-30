angular.module('controllers')
    .controller('SessionController', ['$rootScope', '$scope', '$location','SessionService', function($rootScope, $scope, $location, SessionService) {

        $scope.currentUser = SessionService.getCurrentUser();
        if( $scope.currentUser)
             $('#username').text($scope.currentUser.name)

        $scope.signedIn = function()
        {
           return SessionService.isAuthenticated();
        };

        $scope.submitLogin = function(loginData) {
            SessionService.login(loginData).then( function (response) {
              console.info(response);
              if (response.data.user) {
                  $scope.currentUser = SessionService.currentUser;
                  $('#username').text($scope.currentUser.name);
                  $location.path('/#');
                  Materialize.toast('Вас залогінено!', 1000);
              }
            });
        };

        $scope.getErrorEmail = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.email) {
                    return "Введіть правильний email";
                  }
            }
        }

        $scope.getErrorPassword = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.minlength) {
                    return "Пароль повинен містити не менше 4 символів";
                  }
            }
        }

        $scope.submitLogout = function(){
            SessionService.logout('/').then(function(data) {
                alert('logout')

            });
        }
}]);
