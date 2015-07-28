angular.module('controllers')
    .controller('UpdateAccountController', [ '$rootScope', '$scope', '$location','UserService','SessionService',
                                    function($rootScope, $scope, $location, UserService,SessionService) {
        $scope.user={};

        UserService.edit().then(function(data) {
            console.log(data)
            $scope.user.name = data.name;
            $scope.user.email = data.email;
        });

        $scope.update = function (user) {
            UserService.update(user).then(function (response) {
                console.log(response)
                if (response.data.status) {
                    alert('User updated')
                    SessionService.setUserName( $scope.user.name);
                    $('#username').text($scope.user.name)
                    $location.path('#/')
                } else {
                    if (response.data.errors)
                        for (var error  in response.data.errors)
                            alert(error + " " + response.data.errors[error])

                    $scope.errors = response.data.errors;
                }

            });
        }
    }]);
