(function () {
    'use strict';

    require(['angular', 'app/app', 'app/file/fileService.factory', 'app/file/fileManager.factory', 'app/file/eebFiles.directive', 'app/file/eebFilesUploader.directive'], function (angular, appModule) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appModule.name]);
        });
    });
})();