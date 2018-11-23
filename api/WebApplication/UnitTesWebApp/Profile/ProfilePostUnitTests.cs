using WebApplication.Controllers;
using WebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace UnitTestWebApp
{
    [TestClass]
    public class ProfilePostUnitTests
    {
        public static readonly DbContextOptions<ProfileContext> options
               = new DbContextOptionsBuilder<ProfileContext>()
               .UseInMemoryDatabase(databaseName: "testDatabase")
               .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> profileUsername = new List<string> { "profileUsername0", "profileUsername1", "profileUsername2" };

        [TestInitialize]
        public void SetupDb()
        {
            using (var context = new ProfileContext(options))
            {
                Profile Item1 = new Profile()
                {
                    Id = 1,
                    Username = profileUsername[0]
                };

                Profile Item2 = new Profile()
                {
                    Id = 2,
                    Username = profileUsername[1]
                };

                context.Profile.Add(Item1);
                context.Profile.Add(Item2);
                context.SaveChanges();
            }
        }

        [TestCleanup]
        public void ClearDb()
        {
            using (var context = new ProfileContext(options))
            {
                context.Profile.RemoveRange(context.Profile);
                context.SaveChanges();
            };
        }

        [TestMethod]
        public async Task TestPostItemNoContentStatusCode()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                Profile newItem = new Profile()
                {
                    Id = 3,
                    Username = profileUsername[2]
                };

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.PostProfile(newItem) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(CreatedAtActionResult));
            }
        }

        [TestMethod]
        public async Task TestPostItemContent()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                Profile newItem = new Profile()
                {
                    Id = 3,
                    Username = profileUsername[2]
                };

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.PostProfile(newItem) as IActionResult;
                CreatedAtActionResult body = result as CreatedAtActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.AreEqual(newItem, body.Value);
            }
        }
        // TODO: make unit test for all cases
    }
}
