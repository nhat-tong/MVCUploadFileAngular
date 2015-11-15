(function () {
    'use strict';

    define(['angular'], function (angular) {

        return angular
            .module('app')
            .controller('FileUploadCtrl', FileUploadCtrl);

        function FileUploadCtrl() {
            var vm = this;

            vm.init = init;

            function init() {
                console.log('FileUploadCtrl runned!!!');
            }
        }
    });

})();