angular.module('services')
    .service('DataService',['$http', function($http){
        return {
            // private functions
            handleSuccess: function(data) {
                return data.data
            },

            handleError: function(error) {
                return function () {
                    return error;
                };
            } ,

            getAll: function() {
                return $http.get('home', {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(this.handleSuccess,this.handleError('Error creating user'));
            }
        }
    }]);