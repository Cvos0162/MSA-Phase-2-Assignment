using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Models
{
    public class ProfileContext : DbContext
    {
        public ProfileContext (DbContextOptions<ProfileContext> options)
            : base(options)
        {
        }

        public DbSet<WebApplication.Models.Profile> Profile { get; set; }
    }
}
