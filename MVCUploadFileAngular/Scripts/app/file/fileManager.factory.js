(function () {

    define(['angular'], function (angular) {

        return angular.module('app').factory('FileManager', FileManager);

        //@ngInject
        function FileManager(FileService) {

            var service = {
                upload: upload,
                files: [],
                fileExists: fileExists
            };

            return service;

            /* Télécharger un fichier */
            function upload(files) {
                // Create formData
                var formData = new FormData();

                angular.forEach(files, function (file) {
                    formData.append(file.name, file);
                });

                return FileService.upload(formData);
            }

            /* Vérifie si le fichier déja existé */
            function fileExists(fileName) {
                var res = false;
                service.files.forEach(function (file) {
                    if (file.name === fileName) {
                        res = true;
                        return;
                    }
                });

                return res;
            }
        }
    });
})();