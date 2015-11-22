#region
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
#endregion

namespace MVCUploadFileAngular.Controllers
{
    public class UploadController : ApiController
    {
        #region Post
        /// <summary>
        /// Upload file
        /// </summary>
        /// <returns></returns>
        public async Task<HttpResponseMessage> Post()
        {
            var formDataCollection = new Dictionary<string, string>();

            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            // Path to save uploaded 
            string savedFilePath = HttpContext.Current.Server.MapPath("~/App_Data");
            var streamProvider = new MultipartFormCustomDataStreamProvider(savedFilePath);

            try
            {
                var sb = new StringBuilder();

                // Read the form data and return an async task
                await Request.Content.ReadAsMultipartAsync(streamProvider);

                // Get the form data
                foreach (var key in streamProvider.FormData.AllKeys)
                {
                    foreach (var val in streamProvider.FormData.GetValues(key))
                    {
                        formDataCollection.Add(key, val);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        #endregion

        #region Get
        /// <summary>
        /// Upload file
        /// </summary>
        /// <returns></returns>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "hello");
        }
        #endregion
    }

    /// <summary>
    /// MultipartFormStreamProvider custom pour surcharger le nom du fichier téléchargé
    /// </summary>
    class MultipartFormCustomDataStreamProvider : MultipartFormDataStreamProvider
    {
        public MultipartFormCustomDataStreamProvider(string savedFilePath)
            : base(savedFilePath)
        { }

        /// <summary>
        /// Récupérer le nom du fichier téléchargé comme initial
        /// </summary>
        /// <param name="headers"></param>
        /// <returns></returns>
        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            var fileName = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
            return Path.GetFileName(fileName.Replace("\"", string.Empty));
        }
    }
}
