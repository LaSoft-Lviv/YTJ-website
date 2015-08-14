angular.module('services')
    .service('ProjectService',['$http', '$q', function($http, $q){

      var  projectsUrl = function(params) {
            var url = '/projects';
            return url;
        };

      var editProjectsUrl = function(params) {
            var url = projectsUrl(params);
            url += '/' + params['id'] + '/edit';
            return url;
        };
        var updateProjectsUrl = function(params) {
            var url = projectsUrl(params);

            url += '/' + params['id'];

            return url;
        };


        return {
            // private functions
            handleSuccess: function(data) {
                return data;
            },

            handleError: function(error) {
                         return error;
            } ,

            getAllProjects: function () {
                var url = projectsUrl();
                return $http.get(url).then(this.handleSuccess, this.handleError);
            },

            getAllTeamMembers: function() {
                return $http.get('team_members').then(this.handleSuccess,this.handleError);
            },

            addProject: function(form){
               var  url = projectsUrl(),
                   deferred = $q.defer();
                return   $http.post(url, form, {
                    headers: { 'Content-Type': undefined ,'Authorization':'Token token='+localStorage.getItem('auth_token')},
                    transformRequest: angular.identity
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject('Error while add project!');
                    })

                return deferred.promise;
            },

            edit: function(params){

                var deferred = $q.defer(),
                    url = editProjectsUrl(params);
                    $http.get(url, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization':'Token token='+localStorage.getItem('auth_token')}
                })
                    .success(function(data) {
                        deferred.resolve(data.project);
                    })
                    .error(function(data) {
                        deferred.reject('Error while edit project');
                    })

                return deferred.promise;
            },

            update: function(form,params) {

                var deferred = $q.defer(),
                    url = updateProjectsUrl(params);

                $http.put(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject('Error while updating project!');
                });
                return deferred.promise;
            },

            remove: function (id) {
                var deferred = $q.defer(), url = projectsUrl(0);
                url += "/" + id;
                $http.delete(url, {
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject('Error while deleting project!');
                })

                return deferred.promise;
            }


        /*return $http.post('/project',{project: project},
                    { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                      'Authorization':'Token token='+localStorage.getItem('auth_token')}}).then(this.handleSuccess,this.handleError);*/


        }



    }]);
