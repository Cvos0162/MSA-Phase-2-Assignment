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
    public class ProfileGetUnitTests
    {
        public static readonly DbContextOptions<ProfileContext> options
               = new DbContextOptionsBuilder<ProfileContext>()
               .UseInMemoryDatabase(databaseName: "testDatabase")
               .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> profileUsername = new List<string> { "profileUsername0", "profileUsername1" };
        public static readonly IList<string> profilePassword = new List<string> { "profilePassword0", "profilePassword1" };

        [TestInitialize]
        public void SetupDb()
        {
            using (var context = new ProfileContext(options))
            {
                Profile Item1 = new Profile()
                {
                    Id = 1,
                    Username = profileUsername[0],
                    Password = profilePassword[0]
                };

                Profile Item2 = new Profile()
                {
                    Id = 2,
                    Username = profileUsername[1],
                    Password = profilePassword[1]
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
        public void TestGetItemAll()
        {
            using (var context = new ProfileContext(options))
            {
                // Given

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IEnumerable<Profile> result = profileController.GetProfile();

                // Then
                Assert.IsNotNull(result);
                CollectionAssert.AreEqual(context.Profile.ToList(), result.ToList());
            }
        }

        [TestMethod]
        public async Task TestGetItemSingleStatusCode()
        {
            using (var context = new ProfileContext(options))
            {
                // Given

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.GetProfile(1) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            }
        }
        [TestMethod]
        public async Task TestGetItemSingleObject()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                var profile = await context.Profile.FindAsync(1);

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                OkObjectResult result = await profileController.GetProfile(1) as OkObjectResult;

                // Then
                Assert.AreEqual(profile, result.Value);
            }
        }
        [TestMethod]
        public async Task TestGetItemByUsername()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                var username = profileUsername[0];
                var profile = await (from p in context.Profile where (p.Username == username) select p).Distinct().ToListAsync();

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.GetProfilebyUsername(username) as IActionResult;
                OkObjectResult body = result as OkObjectResult;
                IEnumerable<Profile> v = body.Value as IEnumerable<Profile>;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
                CollectionAssert.AreEqual(profile, v.ToList());
            }
        }
        [TestMethod]
        public async Task TestGetItemByLogin()
        {
            using (var context = new ProfileContext(options))
            {
                // Given
                var username = profileUsername[0];
                var password = profilePassword[0];
                var profile = await (from p in context.Profile where (p.Username == username) && (p.Password == password) select p).Distinct().ToListAsync();

                // When
                ProfileController profileController = new ProfileController(context, configuration);
                IActionResult result = await profileController.GetLogin(username, password) as IActionResult;
                OkObjectResult body = result as OkObjectResult;
                IEnumerable<Profile> v = body.Value as IEnumerable<Profile>;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
                CollectionAssert.AreEqual(profile, v.ToList());
            }
        }
        // TODO: make unit test for all cases
    }
}
