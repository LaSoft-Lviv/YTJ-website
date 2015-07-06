angular.module('services')
   .service('UserService',['$http', function($http){
        return {
           // private functions
         handleSuccess: function(data) {
            return data;
        },

        handleError: function(error) {
            return function () {
                return error;
            };
        } ,
        register: function(user) {
                return $http.post('/account', user).then(this.handleSuccess,this.handleError('Error creating user'));
        },
        update: function(user) {
                return $http.patch('/account', user ,{headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError('Error creating user'));
            }
        }
    }]);