angular.module('controllers')
    .controller('ProjectEditController', ['$scope','$location','$http','$route','$routeParams','ProjectService',
                                        function ($scope,  $location, $http, $route, $routeParams, ProjectService) {

         $scope.project = {};

        var params = $route.current.params;
        ProjectService.edit(params).then(function(data) {
            $scope.project.name = data.name;
            $scope.project.description = data.description;
            $scope.project.facebook_link = data.facebook_link;
            if(data.team_members.length>0) {

                $scope.project.team_member_prev_id = data.team_members[0].id;

            }
            else
            {
                $scope.project.team = null;
            }
            $scope.project.image = data.image;
            ProjectService.getAllTeamMembers().then(function (data) {

               $scope.team = data.data.team;


            });

           ;
        });
         $scope.updateProject = function() {
          var form = collectFormData();
             ProjectService.update(form, params).then(function(data) {
                if (data.success) {
                  $location.path('#/')
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


             if( $scope.project.team && $scope.project.team_member_prev_id &&$scope.project.team_member_prev_id != $scope.project.team)
             {
                 form.append('team_member_id', $scope.project.team);
                form.append('team_member_prev_id', $scope.project.team_member_prev_id);
             }
             else if(!$scope.project.team_member_prev_id && $scope.project.team)
             {
                 form.append('team_member_id', $scope.project.team);
             }
             // gather images and files
             if ($scope.project.image.fresh) {
                form.append('image', $scope.project.image.file);
                }
               return form;
           };


    }]);
