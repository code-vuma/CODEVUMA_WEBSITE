using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeVumaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
            var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
            return Ok(new { email, role });
        }
    }
}
