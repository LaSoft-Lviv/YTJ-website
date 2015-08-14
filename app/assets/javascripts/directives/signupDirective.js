angular.module("ytj")
    .directive("signupDirective", ['UserService', function (UserServise) {
        return {
            restrict: "EACM",
            link: function (scope, element, attributes) {
              scope.$on("userSignupEventSuccess", function () {
                
                var attrValue = attributes["signupDirective"];  
                var data = scope[attrValue]; 

                if (angular.isObject(data)) { 
                  for (error in data) {
                    switch(error) {
                      case 'email':
                        var elements = element.find("input[name='userEmail']");
                        elements.addClass("input-after-error");
                        Materialize.toast(data.email[0], 7000);
                        break;
                        case 'name':
                        var elements = element.find("input[name='userName']");
                        elements.addClass("input-after-error");
                        Materialize.toast(data.name[0], 7000);
                        break;
                        case 'password':
                        var elements = element.find("input[name='userPassword']");
                        elements.addClass("input-after-error");
                        Materialize.toast(data.password[0], 7000);
                        break;
                        case 'password_confirmation':
                        var elements = element.find("input[name='userPasswordConfirm']");
                        elements.addClass("input-after-error");
                        Materialize.toast(data.password_confirmation[0], 7000);
                        break;
                    }
                  }
                }
            })
        }
    }
}]);
