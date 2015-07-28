angular.module("ytj")
        .directive("signupDirective", ['UserService', function () {
            return {
              restrict: "EACM",
                link: function (scope, element, attributes) {
                    scope.$on("userSignupEventSuccess", function () {
                    debugger;
                    alert('y');

                    var attrValue = attributes["signupDirective"];  
                    var data = scope[attrValue]; 

                      if (angular.isObject(data)) {

                        if (data.status == "success") {
                        alert("Вас успішно зареєстровано!");
                        $location.path('/signin');
                        } else { 
                          alert("Вас не було зареєстровано!");
                          console.info(data);

                            for (error in data) {
                            alert(error);
                            switch(error) {
                              case 'email':
                                var elements = element.find("input[name='userEmail']");
                                elements.addClass("input-after-error");
                              case 'name':
                                var elements = element.find("input[name='userName']");
                                elements.addClass("input-after-error");
                              case 'password':
                                var elements = element.find("input[name='userPassword']");
                                elements.addClass("input-after-error");
                              case 'password_confirmation':
                                var elements = element.find("input[name='userPasswordConfirm']");
                                elements.addClass("input-after-error");
                            }
                            }
                          }
                      }
                    })
                }
            }
    }]);
