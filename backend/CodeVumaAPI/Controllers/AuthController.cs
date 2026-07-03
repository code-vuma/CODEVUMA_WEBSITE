using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CodeVumaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var adminEmail = _config["Admin:Email"] ?? "admin@codevuma.com";
            var adminPassword = _config["Admin:Password"] ?? "changeme";

            if (!string.Equals(dto.Email, adminEmail, StringComparison.OrdinalIgnoreCase) ||
                dto.Password != adminPassword)
                return Unauthorized(new { message = "Invalid credentials." });

            var token = GenerateToken(dto.Email);
            return Ok(new { token });
        }

        private string GenerateToken(string email)
        {
            var jwtSection = _config.GetSection("Jwt");
            var key = jwtSection["Key"] ?? "dev-key-change-this";
            var issuer = jwtSection["Issuer"] ?? "CodeVuma";
            var audience = jwtSection["Audience"] ?? "CodeVuma";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public record LoginDto(string Email, string Password);
}
