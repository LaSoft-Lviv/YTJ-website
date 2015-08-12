angular.module('controllers')
    .controller('ProjectEditController', ['$scope','$location','$http','$route','$routeParams','ProjectService',
        function ($scope,  $location, $http, $route, $routeParams, ProjectService) {

        $scope.project = {};

        var params = $route.current.params;

        ProjectService.edit(params).then(function(data) {
            $scope.project.name = data.name;
            $scope.project.description = data.description;
            $scope.project.facebook_link = data.facebook_link;
            $scope.project.image = data.image;
            
            if(data.team_members.length > 0) {
              $scope.project.team_member_prev_id = data.team_members[0].id;
              $scope.project.team_member = data.team_members[0];
            } else {
                $scope.project.team = null;
            }
           
            ProjectService.getAllTeamMembers().then(function (data) {
              $scope.team = data.data.team;
            });
        });

        $scope.updateProject = function() {
          var form = collectFormData();
            ProjectService.update(form, params).then(function(data) {
              if (data.success) {
                  $location.path('/projects')
              } else {
                  if (data.errors)
                      for (error  in data.errors)
                          alert(error + " " + data.errors[error])
                  else
                      alert(data.statusText)
                  $scope.errors = data.errors;
              }
          });
         };

          $scope.projectFoto = {
              add: function (file) {
                  if (file.type.match('image.*')) {
                      var reader = new FileReader();
                      reader.onload = function (event) {
                          $scope.project.image = {
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

          var collectFormData = function() {
            var form = new FormData();

            form.append('name', $scope.project.name);
            form.append('description', $scope.project.description);
            form.append('facebook_link', $scope.project.facebook_link);

            if($scope.project.team && $scope.project.team_member_prev_id && $scope.project.team_member_prev_id != $scope.project.team)
             {
                form.append('team_member_id', $scope.project.team);
                form.append('team_member_prev_id', $scope.project.team_member_prev_id);
             }  else if (!$scope.project.team_member_prev_id && $scope.project.team)
             {  form.append('team_member_id', $scope.project.team);
             }
             // gather images and files
             if ($scope.project.image.fresh) {
                form.append('image', $scope.project.image.file);
             }
             return form;
           };

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
