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

        $scope.addProject = function(project) {
            var form = collectFormData();
            ProjectService.addProject(form).then(function (data) {

                if (data.data.success) {
                    $location.path('#/')
                }
                else {
                    if (data.data.errors)
                        for (error  in data.data.errors)
                            alert(error + " " + data.data.errors[error])
                    else
                        alert(data.statusText)
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



    }]);
