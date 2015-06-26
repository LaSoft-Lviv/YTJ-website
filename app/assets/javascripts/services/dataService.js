angular.module('services')
    .service('DataService',['$http', function($http){
        return {
            // private functions
            handleSuccess: function(data) {
                return data.data.projects;
            },

            handleError: function(error) {
                return function () {
                    return error;
                };
            } ,

            getAll: function() {

                return $http.get('home/index.json').then(this.handleSuccess,this.handleError('Error creating user'));
            }
        }
    }]);