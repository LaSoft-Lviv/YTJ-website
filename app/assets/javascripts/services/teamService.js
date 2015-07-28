angular.module('services')
    .service('TeamService',['$http', '$q', function($http, $q) {

        var teamUrl = function (params) {
            var url = '/team_members';
            return url;
        };

        var editTeamUrl = function (params) {
            var url = teamUrl(params);
            url += '/' + params['id'] + '/edit';
            return url;
        };
        var updateTeamUrl = function (params) {
            var url = teamUrl(params);

            url += '/' + params['id'];

            return url;
        };


        return {
            // private functions
            handleSuccess: function (data) {
                return data;
            },

            handleError: function (error) {
                return error;
            },

            getAllTeamMembers: function () {
                return $http.get('team_members').then(this.handleSuccess, this.handleError);
            },

            add: function (form) {

                var url = teamUrl()
                return $http.post(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                }).then(this.handleSuccess, this.handleError);

            },

            remove: function (id) {
                var deferred = $q.defer(), url = teamUrl();
                url += "/" + id;
                $http.delete(url, {
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json',
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')}
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject('Error while deleting article!');
                })

                return deferred.promise;
            },
            edit: function(params){

                var deferred = $q.defer(),
                    url = editTeamUrl(params);
                $http.get(url, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                    'Authorization':'Token token='+localStorage.getItem('auth_token')}
                })
                    .success(function(data) {
                        deferred.resolve(data.team_member);
                    })
                    .error(function(data) {
                        deferred.reject('Error while deleting team member!');
                    })

                return deferred.promise;
            },

            update: function(form,params) {

                var deferred = $q.defer(),
                    url = updateTeamUrl(params);

                $http.put(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject('Error while updating team member!');
                });
                return deferred.promise;
            }
        }
    }
]);