angular.module('controllers')
    .controller('TeamEditController', ['$scope','$location','$http','$route','$routeParams','TeamService',
        function ($scope,  $location, $http, $route, $routeParams, TeamService) {

            $scope.titleTeam = "Проекти";
            $scope.team_member = {};
            var params = $route.current.params;

            TeamService.edit(params).then(function(data) {
                $scope.team_member.name = data.name;
                $scope.team_member.surname = data.surname;
                $scope.team_member.email = data.email;
                $scope.team_member.quote = data.quote;
                $scope.team_member.phone = data.phone;
                $scope.team_member.foto = data.foto;
                $scope.team_member.facebook_link = data.facebook_link;
                $scope.team_member.is_initiative = data.is_initiative;

            });
            $scope.updateTeamMember = function(team_member) {
                var form = collectFormData();
                TeamService.update(form,params).then(function (response) {
                  if (response.team_member) {
                        $location.path('#/')
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
        }
    ]);