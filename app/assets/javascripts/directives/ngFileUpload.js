angular.module("directives")
    .directive("mgFileUpload", [mgFileUpload]);
function mgFileUpload() {
    var directive = {
        require: "ngModel",
        scope: {mgFileUpload: "="},
        link: function (scope, element, attributes, ngModel) {
            var $hoverTarget = element.find(".drop-area");

            dragEnter = function (event) {
                event.stopPropagation();
                event.preventDefault();
            },

                dragOver = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    $hoverTarget.addClass("highlighted");
                },

                dragLeave = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    $hoverTarget.removeClass("highlighted");
                },

                drop = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.originalEvent.dataTransfer.dropEffect = 'copy';

                    traverseFiles(event);
                    $hoverTarget.removeClass("highlighted");
                },

            /**
             * Clicking on link will dispatch "Open file" dialog
             *
             * @param event
             */
                chooseFiles = function (event) {
                    event.preventDefault();
                    element.find(".js-progress-files").click();
                },


            /**
             * Read uploaded file and prepare to sending
             */
                readImageData = function (file) {
                    scope.mgFileUpload.add(file);
                },

            /**
             * Handle file drag&drop or file select
             * Pass file to upload function
             *
             * @param event File drop or Input select event
             */
                traverseFiles = function (event) {

                    var files = event.dataTransfer ? event.dataTransfer.files : ((event.originalEvent && event.originalEvent.dataTransfer) ? event.originalEvent.dataTransfer.files : event.currentTarget.files);
                       for (var i = 0; i < files.length; i++){
                        var file = files[i];

                        if (typeof file !== "undefined") {
                            readImageData(file);
                        } else {
                            console.log("Not image selected");  //TODO:: work on that
                        }
                    };
                };


            // bind drag&drop events
            element
                .find(".drop-area");


            element.find(".js-progress-files").bind("change", traverseFiles);

        }
    };
    return directive;
}

