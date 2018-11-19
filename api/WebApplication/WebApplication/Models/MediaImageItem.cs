using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class MediaImageItem
    {
        public string Title { get; set; }
        public string Discription { get; set; }
        public string Uploader { get; set; }
        public IFormFile Image { get; set; }
    }
}
