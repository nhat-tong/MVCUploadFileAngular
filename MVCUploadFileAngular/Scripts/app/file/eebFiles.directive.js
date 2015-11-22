(function () {

    'use strict';

    define(['angular'], function (angular) {

        return angular.module('app').directive('eebFiles', EebFiles);

        function EebFiles() {
            var directive = {
                link: linkFunc,
                restrict: 'A',
                scope: {
                    files: '=eebFiles',
                    hasFiles: '='
                },
                controller: EebFilesCtrl,
                controllerAs: 'vm',
                bindToController: true
            };

            return directive;

            function linkFunc(scope, element, attrs, vm) {

                element.bind('change', function () {
                    scope.$apply(function () {
                        if (element[0].files) {
                            vm.files = [];

                            angular.forEach(element[0].files, function (file) {
                                vm.files.push(file);
                            });

                            vm.hasFiles = true;
                        }
                    });
                });

                if (element[0].form) {
                    angular.element(element[0].form)
                            .bind('reset', function () {
                                vm.files = [];
                                vm.hasFiles = false;
                            });
                }
            }

            function EebFilesCtrl() {
                var vm = this;

                vm.files = [];
                vm.hasFiles = false;
            }
        }
    });
})();