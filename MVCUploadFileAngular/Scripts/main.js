(function () {
    'use strict';

    // Load all css 
    require(['cssSite', 'cssBootstrap', 'cssAngularToaster']);

    // Load all js
    require(['angular', 'app/app', 'app/file/fileService.factory', 'app/file/fileManager.factory', 'app/file/eebFiles.directive', 'app/file/eebFilesUploader.directive'], function (angular, appModule) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appModule.name]);
        });
    });
})();