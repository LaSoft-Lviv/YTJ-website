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

              return $http.post('/login', {
                        session: {email:user.email, password:user.password}
                   }).success(function(response) {

                   if (response.status) {
                       service.currentUser = response.user;
                       if (service.isAuthenticated()) {
                           localStorage.setItem('auth_token', service.currentUser.auth_token);
                           localStorage.setItem('name', service.currentUser.name)
                       }
                   }
                   else {
                       alert(response.errors)
                   }
               }).error(function(error) {
                         return error
               });
                },
            logout: function(redirectUrl) {
                 return  $http.delete('/logout',{
                     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+service.currentUser.auth_token},

                }).success(function(data) {
                     service.currentUser = null;
                     $location.url(redirectUrl);
                }).error(function(data) {
                 alert('Error while logout!');
                });
            },

            currentUser: null,

            isAuthenticated: function(){
                   return !!service.currentUser;
            },

            setUser: function(user){
                if(user) {
                    service.currentUser = user;
                }
            }


        };
        return service;
    }]);