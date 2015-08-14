angular.module('services')
    .service('ImageService',['$http', '$q', function($http, $q) {
        var  slidesUrl = function(params) {
            var url = '/slides';
            return url;
        };
        var editSlidesUrl = function(params) {
            var url = slidesUrl(params);
            url += '/' + params['id'] + '/edit';
            return url;
        };
        var updateSlidesUrl = function(params) {
            var url = slidesUrl(params);
            url += '/' + params['id'];
            return url;
        };

        return {
            add: function (form) {
                var url = slidesUrl(),
                    deferred = $q.defer();

                    return $http.post(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                    })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject('Error while add slide!');
                    })

                return deferred.promise;
            },

            getAll: function() {
                var url = slidesUrl(),
                    deferred = $q.defer();
                return $http.get(url,{
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json',
                            'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                        }
                    })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject('Error while get all slide');
                    });

                return deferred.promise;
            },

            remove: function (id) {
                var deferred = $q.defer(), url = slidesUrl();
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
                });

                return deferred.promise;
            },
            
            edit: function(params){

                var deferred = $q.defer(),
                    url = editSlidesUrl(params);
                $http.get(url, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',
                    'Authorization':'Token token='+localStorage.getItem('auth_token')}
                })
                    .success(function(data) {
                        deferred.resolve(data.slide);
                    })
                    .error(function(data) {
                        deferred.reject('Error while edit slide');
                    })

                return deferred.promise;
            },

            update: function(form,params) {

                var deferred = $q.defer(),
                    url = updateSlidesUrl(params);

                $http.put(url, form, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Token token=' + localStorage.getItem('auth_token')
                    },
                    transformRequest: angular.identity
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject('Error while updating slide!');
                });
                return deferred.promise;
            },
        }

    }]);