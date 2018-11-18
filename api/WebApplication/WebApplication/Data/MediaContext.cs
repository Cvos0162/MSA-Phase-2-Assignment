using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Models
{
    public class MediaContext : DbContext
    {
        public MediaContext (DbContextOptions<MediaContext> options)
            : base(options)
        {
        }

        public DbSet<WebApplication.Models.Media> Media { get; set; }
    }
}
