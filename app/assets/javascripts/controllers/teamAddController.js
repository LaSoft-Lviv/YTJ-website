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


            $scope.teamFoto = {
                add: function (file) {

                    if (file.type.match('image.*')) {

                        console.log('ss');
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
                alert($scope.team_member.is_initiative)
                form.append('facebook_link', $scope.team_member.facebook_link);

                // gather images and files
                if ($scope.team_member.foto.fresh) {
                    console.log($scope.team_member.foto)
                    form.append('file', $scope.team_member.foto.file);
                }
                return form;
            };
        }
]);