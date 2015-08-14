angular.module('controllers')
    .controller('ProjectAddController', ['$scope', '$rootScope', '$translate', '$location','$http','$route','$routeParams','ProjectService',
                                        function ($scope, $rootScope, $translate, $location, $http, $route, $routeParams, ProjectService) {

        $scope.titleProject="Проекти";
        $scope.project = {
                image : {},
                name : "",
                description: "",
                team : "",
                facebook_link: ""
        };
        var params = $route.current.params;

        $translate('ADDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
        });

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('ADDMESSAGE').then(function (succesMessage) {
            $scope.succesMessage = succesMessage;
            });
        });

        ProjectService.getAllTeamMembers().then(function (data) {
            $scope.team = data.data.team;
        });

        $scope.addProject = function() {
            var form = collectFormData();
            ProjectService.addProject(form).then(function (data) {
                if (data.data.success) {
                    $location.path('/projects');
                    Materialize.toast($scope.succesMessage, 3000);
                } else {
                    if (data.data.errors) {
                        for (var error in data.data.errors) {
                            switch(error) {
                                    case 'name':
                                    Materialize.toast(data.data.errors[error][0], 7000);
                                    break;
                                    case 'description':
                                    Materialize.toast(data.data.errors[error][0], 7000);
                                    break;
                                    case 'facebook_link':
                                    Materialize.toast(data.data.errors[error][0], 7000);
                                    break;
                                    case 'image':
                                    Materialize.toast(data.data.errors[error][0], 7000);
                                    break;
                                }
                        }
                    }
                  }

            })
        };

        $scope.projectFoto = {
            add: function(file) {
                  if (file.type.match('image.*')) {
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

            form.append('locale', $rootScope.currentLang);
            form.append('name', $scope.project.name);
            form.append('description', $scope.project.description);
            form.append('team_member_id', $scope.project.team);
            form.append('facebook_link', $scope.project.facebook_link);

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
