using System;
using System.Runtime.Serialization;

namespace MVCUploadFileAngular.Models
{
    [DataContract]
    public class FileViewModel
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "createdDate")]
        public DateTime CreatedDate { get; set; }

        [DataMember(Name = "modifiedDate")]
        public DateTime ModifiedDate { get; set; }

        [DataMember(Name = "size")]
        public long Size { get; set; }

        [DataMember(Name = "path")]
        public string Path { get; set; }
    }
}