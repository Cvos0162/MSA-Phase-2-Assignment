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
    public class MediaDeleteUnitTests
    {
        public static readonly DbContextOptions<MediaContext> options
            = new DbContextOptionsBuilder<MediaContext>()
            .UseInMemoryDatabase(databaseName: "testDatabase")
            .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> mediaTitles = new List<string> { "Title0", "Title1" };

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
        public async Task TestDeleteItemNoContentStatusCode()
        {
            using (var context = new MediaContext(options))
            {
                // Given

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.DeleteMedia(1) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            }
        }

        [TestMethod]
        public async Task TestDeleteItemContent()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                var media = await context.Media.FindAsync(1);

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.DeleteMedia(1) as IActionResult;
                Media body = result as Media;

                // Then
                Assert.IsNotNull(result);
                Assert.AreEqual(media, body);
            }
        }
        // TODO: make unit test for all cases
    }
}
