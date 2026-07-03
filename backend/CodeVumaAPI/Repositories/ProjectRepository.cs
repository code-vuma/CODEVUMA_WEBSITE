using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CodeVumaAPI.Data;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly CodeVumaDbContext _db;

        public ProjectRepository(CodeVumaDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
            => await _db.Projects.AsNoTracking().ToListAsync();

        public async Task<Project?> GetByIdAsync(int id)
            => await _db.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

        public async Task<Project> AddAsync(Project project)
        {
            project.CreatedAt = DateTime.UtcNow;
            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> UpdateAsync(int id, Project updated)
        {
            var existing = await _db.Projects.FindAsync(id);
            if (existing == null) return null;

            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.Url = updated.Url;
            existing.ImageUrl = updated.ImageUrl;
            existing.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _db.Projects.FindAsync(id);
            if (existing == null) return false;

            _db.Projects.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
