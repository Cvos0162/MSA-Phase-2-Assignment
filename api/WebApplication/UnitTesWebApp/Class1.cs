using WebApplication.Controllers;
using WebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace UnitTestMemeBank
{
    [TestClass]
    public class PutUnitTests
    {
        public static readonly DbContextOptions<MediaContext> options 
            = new DbContextOptionsBuilder<MediaContext>()
            .UseInMemoryDatabase(databaseName: "testDatabase")
            .Options;
        public static IConfiguration configuration = null;
        public static readonly IList<string> mediaTitles = new List<string> { "dankMeme", "dankerMeme" };

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
        public async Task TestPutMemeItemNoContentStatusCode()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                string title = "putMeme";
                Media Item1 = context.Media.Where(x => x.Title == mediaTitles[0]).Single();
                Item1.Title = title;

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.PutMedia(Item1.Id, Item1) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(NoContentResult));
            }
        }

        [TestMethod]
        public async Task TestPutMemeItemUpdate()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                string title = "putMeme";
                Media Item1 = context.Media.Where(x => x.Title == mediaTitles[0]).Single();
                Item1.Title = title;

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.PutMedia(Item1.Id, Item1) as IActionResult;

                // Then
                Item1 = context.Media.Where(x => x.Title == title).Single();
            }
        }
        // TODO: make unit test for all cases
    }
}