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
            },

            sendMail: function(form) {
                return $http.post('/contact', form, {
                    headers: { 'Content-Type': undefined }
                }).then(this.handleSuccess,this.handleError);
            }
        }
    }]);