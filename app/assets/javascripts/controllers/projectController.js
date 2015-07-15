angular.module('controllers')
    .controller('ProjectController', ['$scope','$location','ProjectService','$http', function ($scope,  $location, ProjectService, $http) {

        $scope.titleProject="Проекти";
        $scope.project = {
                image : {},
                name : "",
                description: "",
                team : ""
        };

        ProjectService.getAllTeamMembers().then(function (data) {
            $scope.team = data.data.team;
        });

       /* $scope.file= {};
        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            console.log("fileSelected")
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                console.log(args)
                $scope.file = args.file;
            });
        });
        */

        $scope.addProject = function(project){
            var form = collectFormData();
         ProjectService.addProject(form).then(function(data) {
              if(data.data.success){
                   $location.path('#/')
               }
                else{
                 if(data.data.errors)
                        for(error  in data.data.errors)
                                   alert(error + " "+data.data.errors[error])
                  else
                   alert(data.statusText)
               }

            })
        }

        $scope.projectFoto = {
            add: function(file) {

                if (file.type.match('image.*')) {
                    console.log('ss');
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

            // gather images and files
            if ($scope.project.image.fresh) {
                console.log($scope.project.image)
                form.append('file', $scope.project.image.file);
            }
            return form;
        };



    }]);
