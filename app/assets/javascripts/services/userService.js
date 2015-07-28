angular.module('services')
    .service('UserService',['$http','$q', function($http,$q){
        var  accountsUrl = function() {
            var url = '/accounts';
            return url;
        };
        return {
            handleSuccess: function(data) {
                return data;
            },
            handleError: function(error) {
                return error;
            },
            register: function(user) {
                return $http.post(accountsUrl(), user).then(this.handleSuccess,this.handleError);
            },
            update: function(user) {
                return $http.patch(accountsUrl(), user ,{headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError('Error creating user'));
            },
            edit: function(){
                var deferred = $q.defer(),
                    url = accountsUrl();
                $http.get(url, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                    'Authorization':'Token token='+localStorage.getItem('auth_token')}
                })
                .success(function(data) {
                        deferred.resolve(data.user);
                 })
                 .error(function(data) {
                        deferred.reject('Error while edit user');
                 })

                return deferred.promise;
            }

        }
    }]);