angular.module('services')
    .service('SessionService',['$http','$location', function($http,$location){
        var service = {
            // private functions
            handleSuccess: function(data) {
                return data;
            },

            handleError: function(error) {
                return function () {
                    return data;
                };
            } ,

           login : function(user) {

                  return $http.post('/login', {session: {email:user.email, password:user.password} })
                        .then(function(response) {
                            service.currentUser = response.data.user;
                          console.log(service.currentUser)
                            if (service.isAuthenticated()) {
                                  $location.path('/#');

                            }
                        });
                },
            logout: function() {
                 console.log(service.currentUser);
                 return  $http.delete('/logout',{
                     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+service.currentUser.auth_token},

                }).success(function(data) {
                  alert('logout')
                  service.currentUser = null;
                  $location.path('/#');
                }).error(function(data) {
                 alert('Error while logout!');
                });

            },

            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            }

        };
        return service;
    }]);