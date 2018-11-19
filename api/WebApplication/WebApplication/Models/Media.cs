using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class Media
    {
        public int Id { get; set; }
        public string Uploader { get; set; }
        public string Title { get; set; }
        public string Discription { get; set; }
        public string Url { get; set; }
        public string Uploaded { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
    }
}
