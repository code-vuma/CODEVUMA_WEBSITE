using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CodeVumaAPI.Services;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;

        public ContactController(IContactService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactDto dto)
        {
            var created = await _service.SubmitAsync(dto.Name, dto.Email, dto.Message);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, new { status = "success", messageId = created.Id });
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }
    }

    public record ContactDto(string Name, string Email, string Message);
}
