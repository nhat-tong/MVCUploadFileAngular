(function () {

    define(['angular'], function (angular) {

        return angular.module('app').factory('FileManager', FileManager);

        //@ngInject
        function FileManager($q, FileService) {

            var service = {
                upload: upload,
                getFiles: getFiles,
                fileExists: fileExists,
                deleteFile: deleteFile
            };

            return service;

            /* Init FileManager */
            function getFiles() {
                var deferred = $q.defer();
                deferred.resolve(FileService.getFiles());
                return deferred.promise;
            }

            /* Télécharger un fichier */
            function upload(files) {
                // Create formData
                var deferred = $q.defer();

                var allFiles = [];
                FileService.getFiles().then(function (data) {
                    allFiles = data;

                    var formData = new FormData();
                    var count = 0;
                    angular.forEach(files, function (file) {
                        if (fileExists(allFiles, file.name)) return;
                        count++;
                        formData.append(file.name, file);
                    });

                    if (count == 0) {
                        deferred.reject();
                    }
                    else {
                        deferred.resolve(FileService.upload(formData));
                    }
                })

                return deferred.promise;
            }

            /* Vérifie si le fichier déja existé */
            function fileExists(files, fileName) {
                var res = false;
                files.forEach(function (file) {
                    if (file.name === fileName) {
                        res = true;
                        return;
                    }
                });

                return res;
            }

            /* Supprimer fichier */
            function deleteFile(fileName) {
                var deferred = $q.defer();
                deferred.resolve(FileService.deleteFile(fileName));
                return deferred.promise;
            }
        }
    });
})();