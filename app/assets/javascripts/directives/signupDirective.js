/*angular.module("ytj")
        .directive("signupDirective", ['UserService', function () {
            return function (scope, element, attributes) {

             console.log (scope.colors);

              $scope.$watch(registerUser,
              function() {alert('hi')}
             );

                var attrValue = attributes["signupDirective"];  
                var data = scope[attrValue]; 

                if (angular.isObject(data)) {
                    alert('hello');
                } else {var elements = element.find("input[type='email']");
                alert('hello')
                elements.addClass("input-after-error");}
            }
        }]);*/

angular.module("ytj")
        .directive("signupDirective", ['UserService', function () {
          debugger;
            return {
              restrict: "EACM",
                link: function (scope, element, attributes) {
                  debugger;
                    scope.$on("userSignupEventSuccess", function () {
                    alert('y');
                    var attrValue = attributes["signupDirective"];  
                var data = scope[attrValue]; 

                if (angular.isObject(data)) {
                    alert('hello');
                } else {var elements = element.find("input[type='email']");
                alert('hello')
                elements.addClass("input-after-error");}
                    });
                    scope.$on("userSignupEventError", function () {
                    console.log('hello');
                    alert('no');
                    });
                }
            };
    }]);


/*angular.module('mittlag')
  .directive('mgAuthorize', ['AuthService', 'ApplicationPolicy', 'AUTH_EVENTS', function(AuthService, ApplicationPolicy, AUTH_EVENTS) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var permission = attrs.mgAuthorize;
        scope.$on(AUTH_EVENTS.userSignOut, function() { applyPermission() });
        scope.$on(AUTH_EVENTS.userSignIn, function() { applyPermission() });

        var hasAccess = function(permission) {
          return ApplicationPolicy.authorize(permission);
        };

        var applyPermission = function() {
          var permission = attrs.mgAuthorize;

          if(!hasAccess(permission)) {
            element.addClass("hidden-im");
          } else {
            element.removeClass("hidden-im");
          }
        };

        if(!hasAccess(permission)) {
          element.addClass("hidden-im");
        }
      }
    };
}]);*/