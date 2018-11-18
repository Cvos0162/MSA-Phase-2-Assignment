using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly MediaContext _context;

        public MediaController(MediaContext context)
        {
            _context = context;
        }

        // GET: api/Media
        [HttpGet]
        public IEnumerable<Media> GetMedia()
        {
            return _context.Media;
        }

        // GET: api/Media/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var media = await _context.Media.FindAsync(id);

            if (media == null)
            {
                return NotFound();
            }

            return Ok(media);
        }

        // GET: api/Media/Uploader/5
        [Route("Uploader")]
        [HttpGet]
        public async Task<IActionResult> GetMediabyUploader([FromQuery] string uploader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var media = (from m in _context.Media where (m.Uploader==uploader) select m ).Distinct();

            var returned = await media.ToListAsync();

            if (returned == null)
            {
                return NotFound();
            }

            return Ok(returned);
        }

        // PUT: api/Media/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia([FromRoute] int id, [FromBody] Media media)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != media.Id)
            {
                return BadRequest();
            }

            _context.Entry(media).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Media
        [HttpPost]
        public async Task<IActionResult> PostMedia([FromBody] Media media)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Media.Add(media);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedia", new { id = media.Id }, media);
        }

        // DELETE: api/Media/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var media = await _context.Media.FindAsync(id);
            if (media == null)
            {
                return NotFound();
            }

            _context.Media.Remove(media);
            await _context.SaveChangesAsync();

            return Ok(media);
        }

        private bool MediaExists(int id)
        {
            return _context.Media.Any(e => e.Id == id);
        }
    }
}