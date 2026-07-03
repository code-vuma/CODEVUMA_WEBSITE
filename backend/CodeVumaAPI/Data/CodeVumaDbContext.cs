using Microsoft.EntityFrameworkCore;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Data
{
    public class CodeVumaDbContext : DbContext
    {
        public CodeVumaDbContext(DbContextOptions<CodeVumaDbContext> options) : base(options)
        {
        }

        public DbSet<ContactInquiry> ContactInquiries { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;
    }
}
