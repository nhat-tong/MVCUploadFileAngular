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

            function linkFunc(scope, element, attrs, vm) {}

            function EebFilesUploaderCtrl() {
                var vm = this;

                vm.hasFiles = false;
                vm.files = [];
                vm.upload = upload;

                function upload() {
                    return FileManager.upload(vm.files).then(function (data) {
                        if (data.status === 200) {
                            toaster.success("title", "text");
                        }
                        else {
                            toaster.error("title", "text");
                        }
                    });
                }
            }
        }
    });
})();