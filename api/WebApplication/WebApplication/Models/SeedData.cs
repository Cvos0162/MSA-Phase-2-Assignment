using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace WebApplication.Models
{
    public static class SeedData
    {
        public static void InitializeMedia(IServiceProvider serviceProvider)
        {
            using (var context = new MediaContext(
                serviceProvider.GetRequiredService<DbContextOptions<MediaContext>>()))
            {
                // Look for any movies.
                if (context.Media.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                context.Media.AddRange(
                    new Media
                    {
                        Title = "Ryu",
                        Uploader = "cookys0162",
                        Discription = "from Street Fighter",
                        Url = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Ryu_TvC.png/220px-Ryu_TvC.png",
                        Uploaded = DateTime.UtcNow.ToString(),
                        Width = "220px",
                        Height = "220px"
                    }


                );
                context.SaveChanges();
            }
        }
        public static void InitializeProfile(IServiceProvider serviceProvider)
        {
            using (var context = new ProfileContext(
                   serviceProvider.GetRequiredService<DbContextOptions<ProfileContext>>()))
            {
                // Look for any movies.
                if (context.Profile.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                context.Profile.AddRange(
                    new Profile
                    {
                        Username = "cookys0162",
                        First_Name = "In Ha",
                        Last_Name = "Ryu",
                        Discription = "Developer of this webapp",
                        Email = "cookys0162@hotmail.co.kr",
                        Url = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Ryu_TvC.png/220px-Ryu_TvC.png",
                        Uploaded = DateTime.UtcNow.ToString(),
                        Width = "220px",
                        Height = "220px"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
