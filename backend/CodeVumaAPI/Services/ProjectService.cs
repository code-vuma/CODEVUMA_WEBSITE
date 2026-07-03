using System.Collections.Generic;
using System.Threading.Tasks;
using CodeVumaAPI.Models;
using CodeVumaAPI.Repositories;

namespace CodeVumaAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repo;

        public ProjectService(IProjectRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<Project>> GetAllAsync() => _repo.GetAllAsync();
        public Task<Project?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
        public Task<Project> CreateAsync(Project project) => _repo.AddAsync(project);
        public Task<Project?> UpdateAsync(int id, Project project) => _repo.UpdateAsync(id, project);
        public Task<bool> DeleteAsync(int id) => _repo.DeleteAsync(id);
    }
}
