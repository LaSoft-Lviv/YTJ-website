angular.module('services')
    .service('ProjectService',['$http', function($http){
        return {
            // private functions
            handleSuccess: function(data) {
                return data.data
            },

            handleError: function(error) {
                         return error;
            } ,

            getAllTeamMembers: function() {
                return $http.get('team_members').then(this.handleSuccess,this.handleError);
            },

            addProject: function(form){

                return   $http.post("project/", form, {
                    headers: { 'Content-Type': undefined ,'Authorization':'Token token='+localStorage.getItem('auth_token')},
                    transformRequest: angular.identity
                }).success(function(data) {
                    console.log("success")
                })
                    .error(function(data) {
                        console.log("error")
                    });

            }


        /*return $http.post('/project',{project: project},
                    { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                      'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError);*/


        }
    }]);
