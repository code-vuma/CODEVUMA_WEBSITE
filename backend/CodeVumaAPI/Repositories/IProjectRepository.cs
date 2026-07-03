using System.Collections.Generic;
using System.Threading.Tasks;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project> AddAsync(Project project);
        Task<Project?> UpdateAsync(int id, Project updated);
        Task<bool> DeleteAsync(int id);
    }
}
