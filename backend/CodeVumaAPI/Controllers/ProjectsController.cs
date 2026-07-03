using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CodeVumaAPI.Models;
using CodeVumaAPI.Services;

namespace CodeVumaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectsController(IProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _service.GetByIdAsync(id);
            return project is null ? NotFound() : Ok(project);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectDto dto)
        {
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                Url = dto.Url,
                ImageUrl = dto.ImageUrl
            };
            var created = await _service.CreateAsync(project);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProjectDto dto)
        {
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                Url = dto.Url,
                ImageUrl = dto.ImageUrl
            };
            var updated = await _service.UpdateAsync(id, project);
            return updated is null ? NotFound() : Ok(updated);
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }

    public record ProjectDto(string Title, string Description, string? Url, string? ImageUrl);
}
