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

            addProject: function(project){

                return $http.post('/project',{project: project, image:uploader},
                    { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                      'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError);

            }
        }
    }]);
