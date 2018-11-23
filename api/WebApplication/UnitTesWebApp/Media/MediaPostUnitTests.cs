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
    public class MediaPostUnitTests
    {
        public static readonly DbContextOptions<MediaContext> options
            = new DbContextOptionsBuilder<MediaContext>()
            .UseInMemoryDatabase(databaseName: "testDatabase")
            .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> mediaTitles = new List<string> { "Title0", "Title1", "Title2" };

        [TestInitialize]
        public void SetupDb()
        {
            using (var context = new MediaContext(options))
            {
                Media Item1 = new Media()
                {
                    Title = mediaTitles[0]
                };

                Media Item2 = new Media()
                {
                    Title = mediaTitles[1]
                };

                context.Media.Add(Item1);
                context.Media.Add(Item2);
                context.SaveChanges();
            }
        }

        [TestCleanup]
        public void ClearDb()
        {
            using (var context = new MediaContext(options))
            {
                context.Media.RemoveRange(context.Media);
                context.SaveChanges();
            };
        }


        [TestMethod]
        public async Task TestPostItemNoContentStatusCode()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                Media newItem = new Media()
                {
                    Id = 3,
                    Title = mediaTitles[2]
                };

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.PostMedia(newItem) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(CreatedAtActionResult));
            }
        }

        [TestMethod]
        public async Task TestPostItemContent()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                Media newItem = new Media()
                {
                    Id = 3,
                    Title = mediaTitles[2]
                };

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.PostMedia(newItem) as IActionResult;
                CreatedAtActionResult body = result as CreatedAtActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.AreEqual(newItem, body.Value);
            }
        }
        // TODO: make unit test for all cases
    }
}
