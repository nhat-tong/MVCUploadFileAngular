
(function () {
    'use strict';

    define(['angular'], function (angular) {

        /* Work around for load angular-ressources
        var angular = require('angular');
        var ngResource = require('ng-resource');
        ngResource(window, angular);
        */

        return angular.module('app', ['cgBusy', 'ngResource', 'toaster', 'ngAnimate']);
    });

})();