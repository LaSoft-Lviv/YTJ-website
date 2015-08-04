angular.module('services')
    .service('AuthorizationService',[ '$q', '$rootScope', '$location','SessionService',
                                function ($q, $rootScope, $location, SessionService) {
    return {
        // We would cache the permission for the session,
        //to avoid roundtrip to server
        //for subsequent requests

        permissionModel: {
            permission: "isUser",
            isPermissionLoaded: false
        },

        permissionCheck: function (roleCollection) {

            // we will return a promise .
            var deferred = $q.defer();

            //this is just to keep a pointer to parent scope from within promise scope.
            var parentPointer = this;

            //Checking if permission object(list of roles for logged in user) 
            //is already filled from service
            this.permissionModel.isPermissionLoaded = SessionService.isAuthenticated();
            if (this.permissionModel.isPermissionLoaded) {
                //if permission is not obtained yet, we will get it from  server
                SessionService.getCurrentUser().then( function (response) {

                    parentPointer.permissionModel.permission = response.data.permission;
                    console.log(parentPointer.permissionModel.permission)
                      //Check if the current user has required role to access the route
                    parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
                });


            }else{
                parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
            }




            return deferred.promise;
        },

        //Method to check if the current user has required role to access the route
        //'permissionModel' has permission information obtained from server for current user
        //'roleCollection' is the list of roles which are authorized to access route
        //'deferred' is the object through which we shall resolve promise
        getPermission: function (permissionModel, roleCollection, deferred) {
            console.log(permissionModel)
            var ifPermissionPassed = false;

            angular.forEach(roleCollection, function (role) {
                switch (role) {
                    case roles.superUser:
                        if (permissionModel.permission == 'isSuperUser') {
                            ifPermissionPassed = true;
                        }
                        break;
                    case roles.admin:
                        if (permissionModel.permission == 'isAdministrator') {
                            ifPermissionPassed = true;
                            console.log(ifPermissionPassed)
                        }
                        break;
                    case roles.user:
                        if (permissionModel.permission == 'isUser') {
                            ifPermissionPassed = true;
                        }
                        break;
                    default:
                        ifPermissionPassed = false;
                }
            });
            if (!ifPermissionPassed) {
                //If user does not have required access, 
                //we will route the user to unauthorized access page
                $location.path(routeForUnauthorizedAccess);
                //As there could be some delay when location change event happens, 
                //we will keep a watch on $locationChangeSuccess event
                // and would resolve promise when this event occurs.
                $rootScope.$on('$locationChangeSuccess', function (next, current) {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }
    };
}]);