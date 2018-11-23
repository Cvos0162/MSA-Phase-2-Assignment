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
    public class MediaGetUnitTests
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
                    Id = 1,
                    Title = mediaTitles[0],
                    Uploader = mediaTitles[0],
                    Uploaded = "1",
                    Like = 0
                };

                Media Item2 = new Media()
                {
                    Id = 2,
                    Title = mediaTitles[1],
                    Uploader = mediaTitles[1],
                    Uploaded = "0",
                    Like = 1
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
        public void TestGetItemAll()
        {
            using (var context = new MediaContext(options))
            {
                // Given

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IEnumerable<Media> result = mediaController.GetMedia();

                // Then
                Assert.IsNotNull(result);
                CollectionAssert.AreEqual(context.Media.ToList(), result.ToList());
            }
        }

        [TestMethod]
        public async Task TestGetItemSingleStatusCode()
        {
            using (var context = new MediaContext(options))
            {
                // Given

                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.GetMedia(1) as IActionResult;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            }
        }
        [TestMethod]
        public async Task TestGetItemSingleObject()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                var media = await context.Media.FindAsync(1);

                // When
                MediaController mediaController = new MediaController(context, configuration);
                OkObjectResult result = await mediaController.GetMedia(1) as OkObjectResult;
                Media value = result.Value as Media;

                // Then
                Assert.AreEqual(media, value);
            }
        }
        [TestMethod]
        public async Task TestGetItemByUsername()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                Media item1 = new Media()
                {
                    Id = 1,
                    Title = mediaTitles[0],
                    Uploader = mediaTitles[0],
                    Uploaded = "1",
                    Like = 1
                };
                
                // When
                MediaController mediaController = new MediaController(context, configuration);
                IActionResult result = await mediaController.GetMediabyUploader(mediaTitles[0], 0, 1) as IActionResult;
                OkObjectResult body = result as OkObjectResult;
                List<Media> media = body.Value as List<Media>;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
                Assert.AreEqual(item1.Id, media[0].Id);
            }
        }
        [TestMethod]
        public async Task TestGetItemOrderByLatest()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                Media item1 = new Media()
                {
                    Id = 1,
                    Title = mediaTitles[0],
                    Uploader = mediaTitles[0],
                    Uploaded = "1",
                    Like = 0
                };
                Media item2 = new Media()
                {
                    Id = 2,
                    Title = mediaTitles[1],
                    Uploader = mediaTitles[1],
                    Uploaded = "0",
                    Like = 1
                };

                // When
                MediaController mediaController = new MediaController(context, configuration);
                OkObjectResult result = await mediaController.GetMediabyLatest(0, 2) as OkObjectResult;
                List<Media> body = result.Value as List<Media>;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
                Assert.AreEqual(item1.Id, body[0].Id);
                Assert.AreEqual(item2.Id, body[1].Id);
            }
        }
        [TestMethod]
        public async Task TestGetItemOrderByLike()
        {
            using (var context = new MediaContext(options))
            {
                // Given
                Media item1 = new Media()
                {
                    Id = 1,
                    Title = mediaTitles[0],
                    Uploader = mediaTitles[0],
                    Uploaded = "1",
                    Like = 0
                };
                Media item2 = new Media()
                {
                    Id = 2,
                    Title = mediaTitles[1],
                    Uploader = mediaTitles[1],
                    Uploaded = "0",
                    Like = 1
                };

                // When
                MediaController mediaController = new MediaController(context, configuration);
                OkObjectResult result = await mediaController.GetMediabyLike(0, 2) as OkObjectResult;
                List<Media> body = result.Value as List<Media>;

                // Then
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(OkObjectResult));
                Assert.AreEqual(item2.Id, body[0].Id);
                Assert.AreEqual(item1.Id, body[1].Id);
            }
        }
        // TODO: make unit test for all cases
    }
}
