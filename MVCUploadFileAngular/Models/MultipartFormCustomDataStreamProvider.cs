using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace MVCUploadFileAngular.Models
{
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