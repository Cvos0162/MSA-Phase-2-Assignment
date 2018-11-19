using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class ProfileImageItem
    {
        public int User_id { get; set; }
        public IFormFile Image { get; set; }
    }
}
