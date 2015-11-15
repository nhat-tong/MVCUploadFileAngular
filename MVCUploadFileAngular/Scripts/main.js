(function () {
    'use strict';

    require(['angular', 'appModule', 'fileUploadModule'], function (angular, appModule) {
 
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appModule.name]);
        });
    });

})();