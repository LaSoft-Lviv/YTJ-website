angular.module('controllers')
    .controller('TeamAddController', ['$scope','$location','$http','$route','$routeParams','TeamService',
        function ($scope,  $location, $http, $route, $routeParams, TeamService) {

            $scope.titleTeam = "Проекти";
            $scope.team_member = {
                foto: {},
                name: "",
                surname: "",
                email: "",
                quote: "",
                phone: "",
                facebook_link: "",
                is_initiative: false
            };
            
            var params = $route.current.params;

            $scope.addTeamMember = function () {
                var form = collectFormData();
                TeamService.add(form).then(function (data) {
                    if (data.data.success) {
                        $location.path('#/');
                        Materialize.toast('Члена команди успішно додано!', 3000);
                    }  else {
                         if (data.data.errors) {
                            console.log(data.data.errors);
                            for (error  in data.data.errors) {
                                switch(error) {
                                    case 'email':
                                    Materialize.toast('Перевірте, будь-ласка, пошту!', 7000);
                                    break;
                                    case 'name':
                                    Materialize.toast("Перевірте, будь-ласка, ім'я!", 7000);
                                    break;
                                    case 'surname':
                                    Materialize.toast("Перевірте, будь-ласка, прізвище!", 7000);
                                    break;
                                    case 'quote':
                                    Materialize.toast("Перевірте, будь-ласка, цитату!", 7000);
                                    break;
                                    case 'phone':
                                    Materialize.toast("Перевірте, будь-ласка, номер телефону!", 7000);
                                    break;
                                    case 'facebook_link':
                                    Materialize.toast("Перевірте, будь-ласка, facebook-посилання!", 7000);
                                    break;
                                    case 'foto':
                                    Materialize.toast("Перевірте, будь-ласка, фотографію!", 7000);
                                    break;
                                }
                            }
                        }

                       }

                })
            };


            $scope.teamFoto = {
                add: function (file) {

                    if (file.type.match('image.*')) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            $scope.team_member.foto = {
                                id: (new Date()).getTime(),
                                title: file.name,
                                src: event.target.result,
                                file: file,
                                fresh: true
                            };
                            $scope.$apply();
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }


            var collectFormData = function () {
                var form = new FormData();

                form.append('name', $scope.team_member.name);
                form.append('surname', $scope.team_member.surname);
                form.append('quote', $scope.team_member.quote);
                form.append('email', $scope.team_member.email);
                form.append('phone', $scope.team_member.phone);
                form.append('is_initiative', $scope.team_member.is_initiative);
                form.append('facebook_link', $scope.team_member.facebook_link);
                // gather images and files
                if ($scope.team_member.foto.fresh) {
                    form.append('foto', $scope.team_member.foto.file);
                }
                return form;
            };
            
            $scope.memberNamePattern = new RegExp("^[a-zA-ZА-Яа-яІі ,.'-]+$", "i");
            $scope.memberQuotePattern = new RegExp("^[a-zA-ZА-Яа-яІі ,.'-]+$", "i");
            $scope.memberPhonePattern = /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
            $scope.memberFacebookPattern = /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
        

        $scope.getErrorName = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть правильне ім'я";
                  } else if (error.minlength) {
                      return "Ім'я повинно містити не менше 4 символів";
                    } else if (error.maxlength) {
                        return "Ім'я повинно містити не більше 16 символів";
                      }
            }
        }

        $scope.getErrorQuote = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.minlength) {
                      return "Цитата повинна містити не менше 50 символів";
                  } else if (error.maxlength) {
                        return "Цитата повинна містити не більше 1000 символів";
                    }
            }
        }

        $scope.getErrorPhone = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть номер телефону у форматі: +38(050)695-24-89";
                  }
            }
        }

        $scope.getErrorFacebook = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть посилання у форматі: https://www.facebook.com/posmishka.ua?fref=ts";
                  }
            }
        }

        $scope.getErrorEmail = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.email) {
                    return "Введіть правильний email";
                  }
            }
        }

    }]);