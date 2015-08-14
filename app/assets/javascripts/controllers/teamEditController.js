angular.module('controllers')
    .controller('TeamEditController', ['$scope','$location','$http','$route','$routeParams','TeamService',
        function ($scope,  $location, $http, $route, $routeParams, TeamService) {

            $scope.titleTeam = "Проекти";
            $scope.team_member = {};
            var params = $route.current.params;

            TeamService.edit(params).then(function(data) {
                console.log(data.foto);
                $scope.team_member.name = data.name;
                $scope.team_member.surname = data.surname;
                $scope.team_member.email = data.email;
                $scope.team_member.quote = data.quote;
                $scope.team_member.phone = data.phone;
                $scope.team_member.foto = data.foto;
                $scope.team_member.position = data.position;
                $scope.team_member.facebook_link = data.facebook_link;
                $scope.team_member.is_initiative = data.is_initiative;

            });
            $scope.updateTeamMember = function(team_member) {
                var form = collectFormData();
                TeamService.update(form,params).then(function (response) {
                  if (response.team_member) {

                        $location.path('/team')
                    }
                    else {
                        if (response.errors)
                            for (error  in response.errors)
                                alert(error + " " + response.errors[error])
                        else
                            alert(response.statusText)
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
            };


            var collectFormData = function () {
                var form = new FormData();
                form.append('id', $scope.team_member.id);
                if ($scope.team_member.name)
                    form.append('name', $scope.team_member.name);
                if($scope.team_member.surname)
                    form.append('surname', $scope.team_member.surname);
                if($scope.team_member.quote)
                    form.append('quote', $scope.team_member.quote);
                if($scope.team_member.email)
                    form.append('email', $scope.team_member.email);
                if($scope.team_member.phone)
                    form.append('phone', $scope.team_member.phone);
                if($scope.team_member.position)
                    form.append('position', $scope.team_member.position);
                form.append('is_initiative', $scope.team_member.is_initiative);
                if($scope.team_member.facebook_link)
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