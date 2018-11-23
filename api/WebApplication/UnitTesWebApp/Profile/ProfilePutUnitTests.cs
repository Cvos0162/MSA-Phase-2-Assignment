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
    public class ProfilePutUnitTests
    {
        public static readonly DbContextOptions<ProfileContext> options
               = new DbContextOptionsBuilder<ProfileContext>()
               .UseInMemoryDatabase(databaseName: "testDatabase")
               .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> profileUsername = new List<string> { "profileUsername0", "profileUsername1" };

        [TestInitialize]
        public void SetupDb()
        {
            using (var context = new ProfileContext(options))
            {
                Profile Item1 = new Profile()
                {
                    Username = profileUsername[0]
                };

                Profile Item2 = new Profile()
                {
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
        public async Task TestPutItemNoContentStatusCode()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                string username = "new";
                Profile Item1 = context.Profile.Where(x => x.Username == profileUsername[0]).Single();
                Item1.Username = username;

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.PutProfile(Item1.Id, Item1) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(NoContentResult));
            }
        }

        [TestMethod]
        public async Task TestPutItemUpdate()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                string username = "new";
                Profile Item1 = context.Profile.Where(x => x.Username == profileUsername[0]).Single();
                Item1.Username = username;

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.PutProfile(Item1.Id, Item1) as IActionResult;

                // Then
                Item1 = context.Profile.Where(x => x.Username == username).Single();
                Assert.AreEqual(username, Item1.Username);
            }
        }
        // TODO: make unit test for all cases
    }
}
