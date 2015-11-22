(function () {

    'use strict';

    define(['angular'], function (angular) {

        return angular.module('app').directive('eebFilesUploader', EebFilesUploader);

        //@ngInject
        function EebFilesUploader(FileManager, toaster) {
            var directive = {
                link: linkFunc,
                restrict: 'E',
                // create a new scope by inheriting parent scope
                scope: true,
                templateUrl: 'Scripts/app/file/eebFilesUploader.html',
                controller: EebFilesUploaderCtrl,
                controllerAs: 'vm',
                bindToController: true // because the scope is isolated
            };

            return directive;

            function linkFunc(scope, element, attrs, vm) { }

            function EebFilesUploaderCtrl() {
                var vm = this;

                vm.fileList = [];
                vm.files = [];
                vm.init = init;
                vm.upload = upload;
                vm.deleteFile = deleteFile;

                function init() {
                    FileManager.getFiles().then(function (data) {
                        vm.fileList = data;
                    });
                }

                function upload() {
                    vm.uploadPromise = FileManager.upload(vm.files);

                    return vm.uploadPromise.then(function (files) {
                        toaster.success("Your files have been uploaded.");

                        angular.forEach(files, function (file, index) {
                            vm.fileList.push(file);
                        });

                        addFileForm.reset();
                        vm.hasFiles = false;
                        vm.files = '';

                    }, function (error) {
                        toaster.error("Your files existed on the server. Upload aborted!!!");
                    });
                }

                function deleteFile(file) {
                    return FileManager.deleteFile(file.name).then(function (response) {
                        toaster.success("Files " + file.name + " has been deleted");
                        // Remove file from list
                        removeFromArray(vm.fileList, file);
                    });
                }

                function removeFromArray(array, value) {
                    var index = array.indexOf(value);
                    if (index === -1) return;

                    array.splice(index, 1);
                }
            }
        }
    });
})();