angular.module('controllers')
    .controller('ProjectEditController', ['$scope','$location','$http','$route','$routeParams','ProjectService',
                                        function ($scope,  $location, $http, $route, $routeParams, ProjectService) {

         $scope.project = {};

        var params = $route.current.params;
        ProjectService.edit(params).then(function(data) {
            console.log(data)

            console.log(data.team_members)
            $scope.project.name = data.name;
            $scope.project.description = data.description;
            $scope.project.team_member_prev_id = data.team_members[0].id;
            $scope.project.image = data.image;
            for(var i=0;i<data.team_members.length;++i)
            {
                if(data.team_members[i].coordinator){
                $scope.project.team = data.team_members[i]
                }
            }

            ProjectService.getAllTeamMembers().then(function (data) {

               $scope.team = data.data.team;


            });

           ;
        });
         $scope.updateProject = function() {
          var form = collectFormData();
             console.log(form)
          ProjectService.update(form, params).then(function(data) {
              console.log(data)
              if (data.status) {
                  $location.path('#/')
              } else {
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
            form.append('team_member_id', $scope.project.team);

               if($scope.project.team_member_prev_id != $scope.project.team)
               {
                   form.append('team_member_prev_id', $scope.project.team_member_prev_id);
               }
             // gather images and files
             if ($scope.project.image.fresh) {
                form.append('file', $scope.project.image.file);
                }
               return form;
           };


    }]);
