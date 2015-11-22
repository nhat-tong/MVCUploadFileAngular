#region
using MVCUploadFileAngular.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
#endregion

namespace MVCUploadFileAngular.Controllers
{
    public class UploadController : ApiController
    {
        #region Properties
        private FileManager _fileManager;
        #endregion

        #region Initialize
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            _fileManager = new FileManager(HttpContext.Current.Server.MapPath("~/App_Data"));
            base.Initialize(controllerContext);
        }
        #endregion

        #region Post
        /// <summary>
        /// Post
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Post()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, _fileManager.Add(Request));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        #endregion

        #region GetFiles
        /// <summary>
        /// Récupérer la liste des fichiers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetFiles()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _fileManager.GetFiles());
        }
        #endregion

        #region DeleteFile
        /// <summary>
        /// Supprimer un fichier
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [HttpDelete]
        public HttpResponseMessage DeleteFile(string fileName)
        {
            if (!_fileManager.IsFileExists(fileName))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File not found");
            }

            return Request.CreateResponse(HttpStatusCode.OK, _fileManager.Delete(fileName));
        }
        #endregion
    }
}
