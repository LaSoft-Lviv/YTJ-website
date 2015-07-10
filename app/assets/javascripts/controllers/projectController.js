angular.module('controllers')
    .controller('ProjectController', ['$scope','$location','ProjectService','FileUploader','$http', function ($scope,  $location, ProjectService, FileUploader, $http) {

        $scope.titleProject="Проекти"

        ProjectService.getAllTeamMembers().then(function (data) {
            $scope.team = data.team;
        });

        $scope.project = {image:  $scope.uploader = new FileUploader({url: 'project'}) ,
            description:'333'

        };

        $scope.addProject = function(project){

           console.log($scope.sp);
            $http.post('/project', $scope.sp )
                .success ( function onLink ( response) {
                    alert(4)
            })
                .error ( function onLink ( response ) {
                console.log(response)
            }); /**/
           /*ProjectService.addProject(project,uploader).then(function(data) {

               if(data.status){
                 //  $location.path('#/')
               }
                else{
                   console.log(data)
               }

            })*/
        }


     // $scope.uploader = new FileUploader({url: "/project"}) ;


// CALLBACKS
        var uploader = $scope.project.image
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    }]);
