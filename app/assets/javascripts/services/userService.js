angular.module('services')
    .service('UserService',['$http', function($http){
        return {
            handleSuccess: function(data) {
                return data;
            },
            handleError: function(error) {
                return error;
            },
            register: function(user) {
                return $http.post('/accounts', user).then(this.handleSuccess,this.handleError);
            },
            update: function(user) {
                return $http.patch('/accounts', user ,{headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError('Error creating user'));
            }
        }
    }]);