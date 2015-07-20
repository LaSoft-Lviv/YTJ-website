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
                alert(url)
                return $http.post(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                }).then(this.handleSuccess, this.handleError);

            }
        }
    }
]);