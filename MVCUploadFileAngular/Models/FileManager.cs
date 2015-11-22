#region using
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Linq;
#endregion

namespace MVCUploadFileAngular.Models
{
    public class FileManager
    {
        #region Properties
        private string _workingDirectory;
        #endregion

        #region Constructor
        public FileManager(string workingDirectory)
        {
            _workingDirectory = workingDirectory;

            CheckWorkingDirectory();
        }
        #endregion

        #region GetFiles
        public IEnumerable<FileViewModel> GetFiles()
        {
            DirectoryInfo folder = new DirectoryInfo(_workingDirectory);

            return folder.EnumerateFiles()
                .Select(file => new FileViewModel {
                    Name = file.Name,
                    CreatedDate = file.CreationTime,
                    ModifiedDate = file.LastWriteTime,
                    Size = file.Length,
                    Path = file.FullName
                }).ToList();
        }
        #endregion

        #region Add
        public IEnumerable<FileViewModel> Add(HttpRequestMessage request)
        {
            var vm = new List<FileViewModel>();
            var streamProvider = new MultipartFormCustomDataStreamProvider(_workingDirectory);

            try
            {
                // Read the form data and return an async task
                request.Content.ReadAsMultipartAsync(streamProvider);

                // Get the form data if necessary
                /*
                foreach (var key in streamProvider.FormData.AllKeys)
                {
                    foreach (var val in streamProvider.FormData.GetValues(key))
                    {
                        formDataCollection.Add(key, val);
                    }
                }
                */

                // Get file data
                foreach(var fileData in streamProvider.FileData)
                {
                    var fileInfo = new FileInfo(fileData.LocalFileName);

                    vm.Add(new FileViewModel
                    {
                        Name = fileInfo.Name,
                        CreatedDate = fileInfo.CreationTime,
                        ModifiedDate = fileInfo.LastWriteTime,
                        Size = fileInfo.Length,
                        Path = fileInfo.FullName
                    });
                }

                return vm;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Delete
        public bool Delete(string fileName)
        {
            var path = Directory.GetFiles(_workingDirectory, fileName).FirstOrDefault();

            if(path != null)
            {
                File.Delete(path);
                return true;
            }

            return false;
        }
        #endregion

        #region IsFileExists
        public bool IsFileExists(string fileName)
        {
            var path = Directory.GetFiles(_workingDirectory, fileName).FirstOrDefault();
            return path != null;
        }
        #endregion

        #region CheckWorkingDirectory
        /// <summary>
        /// Obtient si le chemin d'accès vers dossier de travail était correcte
        /// </summary>
        private void CheckWorkingDirectory()
        {
            if (!Directory.Exists(_workingDirectory))
            {
                throw new ArgumentException("the destination path " + _workingDirectory + " could not be found");
            }
        }
        #endregion
    }
}