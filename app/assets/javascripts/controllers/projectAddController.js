angular.module('controllers')
    .controller('ProjectAddController', ['$scope','$location','$http','$route','$routeParams','ProjectService',
                                        function ($scope,  $location, $http, $route, $routeParams, ProjectService) {

        $scope.titleProject="Проекти";
        $scope.project = {
                image : {},
                name : "",
                description: "",
                team : "",
                facebook_link: ""
        };
        var params = $route.current.params;

        ProjectService.getAllTeamMembers().then(function (data) {
            $scope.team = data.data.team;
        });

        $scope.addProject = function() {
            debugger;
            var form = collectFormData();
            ProjectService.addProject(form).then(function (data) {

                console.log(data);

                if (data.data.success) {
                    $location.path('/projects');
                    Materialize.toast('Проект успішно додано!', 3000);
                } else {
                    console.info(data);
                    if (data.data.errors) {
                        for (var error in data.data.errors) {
                            console.info(error);
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

        $scope.projectFoto = {
            add: function(file) {

                if (file.type.match('image.*')) {;
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        $scope.project.image = {id: (new Date()).getTime(), title: file.name, src: event.target.result, file: file, fresh: true};
                        $scope.$apply();
                    };

                    reader.readAsDataURL(file);
                }
                }
            };

        var collectFormData = function() {
            var form = new FormData();

            form.append('name', $scope.project.name);
            form.append('description', $scope.project.description);
            form.append('team_member_id', $scope.project.team);
            form.append('facebook_link', $scope.project.facebook_link);


            // gather images and files
            if ($scope.project.image.fresh) {
                form.append('image', $scope.project.image.file);
            }
            return form;
        };

        $scope.projectNamePattern = new RegExp("^[a-zA-ZА-Яа-яІі ,.'-]+$", "i");
        $scope.projectFacebookPattern = /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
        

        $scope.getErrorName = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.pattern) {
                    return "Введіть правильну назву";
                  } else if (error.minlength) {
                      return "Назва повинно містити не менше 4 символів";
                    } else if (error.maxlength) {
                        return "Назва повинно містити не більше 50 символів";
                      }
            }
        }

        $scope.getErrorDescription = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } else if (error.minlength) {
                      return "Опис повинен містити не менше 50 символів";
                  } else if (error.maxlength) {
                        return "Опис повинен містити не більше 1000 символів";
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

        $scope.getErrorOrganizator = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                  return "Поле не повинно бути пустим";
                } 
            }
        }

    }]);
