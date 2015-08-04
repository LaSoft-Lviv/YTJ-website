angular.module("ytj")
    .directive("signupDirective", ['UserService', function (UserServise) {
        return {
            restrict: "EACM",
            link: function (scope, element, attributes) {
              scope.$on("userSignupEventSuccess", function () {
                
                var attrValue = attributes["signupDirective"];  
                var data = scope[attrValue]; 

                if (angular.isObject(data)) { 
                  Materialize.toast('Вас не було зареєстровано!', 5000);
                  for (error in data) {
                    switch(error) {
                      case 'email':
                        var elements = element.find("input[name='userEmail']");
                        elements.addClass("input-after-error");
                        Materialize.toast('Перевірте, будь-ласка, пошту!', 7000);
                        break;
                        case 'name':
                        var elements = element.find("input[name='userName']");
                        elements.addClass("input-after-error");
                        Materialize.toast("Перевірте, будь-ласка, ім'я!", 7000);
                        break;
                        case 'password':
                        var elements = element.find("input[name='userPassword']");
                        elements.addClass("input-after-error");
                        Materialize.toast("Перевірте, будь-ласка, пароль!", 7000);
                        break;
                        case 'password_confirmation':
                        var elements = element.find("input[name='userPasswordConfirm']");
                        elements.addClass("input-after-error");
                        Materialize.toast("Перевірте, будь-ласка, пароль підтвердження!", 7000);
                        break;
                    }
                  }
                }
            })
        }
    }
}]);
