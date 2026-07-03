using System.Collections.Generic;
using System.Threading.Tasks;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project> CreateAsync(Project project);
        Task<Project?> UpdateAsync(int id, Project project);
        Task<bool> DeleteAsync(int id);
    }
}
