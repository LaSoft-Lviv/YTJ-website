angular.module('controllers')
    .controller('ProjectController', ['$scope','$location','ProjectService','FileUploader', '$http', function ($scope,  $location, ProjectService, FileUploader,$http) {

        $scope.titleProject="Проекти"

        ProjectService.getAllTeamMembers().then(function (data) {
            $scope.team = data.team;
        });

        $scope.addProject = function(){

            console.log($scope.sp);

            $http.post('/project', $scope.sp )
                .success ( function onLink ( response) {

                console.log("success")
            })
                .error ( function onLink ( response ) {
                console.log(response)
            });
         /*   ProjectService.addProject(project).then(function(data) {

               if(data.status){
                   $location.path('#/')
               }
                else{
                   console.log(data)
               }

            });*/
        }
        $scope.sp = {serviceprovider: {
            image: { name: $scope.uploader = new FileUploader() }
        },
        name: 'qqqqqq',
         description: 'dddddd'

        };


        $scope.registerProvider = function registerProvider () {

            $http.post('/serviceproviders/new_serviceprovider/', $scope.sp )
                .success ( function onLink ( response) {
                location.href = "index";
            })
                .error ( function onLink ( response ) {
                console.log(response)
            });
        }


    }]);
