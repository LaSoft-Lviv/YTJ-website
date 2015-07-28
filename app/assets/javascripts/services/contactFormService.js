angular.module('services')
    .service('ContactFormService',['$http', function($http){
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

            sendMail: function(contact_form) {

                return $http.post('/contact',contact_form).then(this.handleSuccess,this.handleError);
            }
        }
    }]);