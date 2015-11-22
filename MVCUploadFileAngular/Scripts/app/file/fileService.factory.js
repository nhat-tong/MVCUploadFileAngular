(function () {
    'use strict';

    define(['angular'], function (angular) {

        return angular.module('app').factory('FileService', FileService);

        //@ngInject
        function FileService($http) {           
            var service = {
                getFiles: getFiles,
                upload: upload,
                deleteFile: deleteFile
            };

            return service;

            /* Récupérer la liste des fichiers */
            function getFiles() {
                return $http({
                    method: 'GET',
                    url: ''
                });
            }

            /* Télécharger le fichier */
            function upload(formData) {
                return $http({
                    method: 'POST',
                    url: '/api/Upload/Post',
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined },
                    data: formData
                });
            }

            /* Supprimer un fichier existant */
            function deleteFile(id) {
                return $http({
                    method: 'DELETE',
                    url: ''
                });
            }
        }
    });

})();