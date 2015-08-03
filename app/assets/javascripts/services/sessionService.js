angular.module('services')
    .service('SessionService', ['$http','$location', function($http, $location){
        var service = {
            login: function(user) {
              return $http.post('/login', {
                session: {email: user.email, password: user.password}
                  }).success(function (response) {
                      if (response.status) {
                        service.currentUser = response.user;
                        if (service.isAuthenticated()) {
                           localStorage.setItem('auth_token', service.currentUser.auth_token);
                           localStorage.setItem('name', service.currentUser.name)
                        }
                      } else {
                        Materialize.toast('Неправильні пошта або пароль!', 5000);
                        }
                  }).error(function (error) {
                      return error;
                    });
           },

            logout: function() {
                return  $http.delete('/logout', {
                     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+service.currentUser.auth_token},
                }).success(function(data) {
                     service.currentUser = null;
                     localStorage.setItem('auth_token', "");
                     localStorage.setItem('name', "");
                }).error(function(data) {
                     alert('Error while logout!');
                   });
            },

         /*   currentUser: null,*/

            isAuthenticated: function(){
                return service.currentUser;
            },

       /*     setUser: function(user){
                if(user) {
                    service.currentUser = user;
                }
            },
            isAuthToken: function(){
              return  localStorage.getItem('auth_token')? true:false;
            },
            setUserName: function(name){
                    service.currentUser.name = name;
            },*/
            getCurrentUser: function() {
                var auth_token = localStorage.getItem('auth_token');
                return $http.get('/accounts', {
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization':'Token token='+auth_token},
                }).success(function (response) {
                    if (response.status) {
                        service.currentUser = response.user;
                        if (service.isAuthenticated()) {
                            localStorage.setItem('auth_token', service.currentUser.auth_token);
                            localStorage.setItem('name', service.currentUser.name)
                        }
                    }
                    else
                        service.currentUser = null;

                    return service.currentUser
                }).error(function (error) {
                    return error;
                });

                return service.currentUser;
            }

        };
        return service;
    }]);