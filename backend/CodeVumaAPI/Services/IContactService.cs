using System.Collections.Generic;
using System.Threading.Tasks;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Services
{
    public interface IContactService
    {
        Task<ContactInquiry> SubmitAsync(string name, string email, string message);
        Task<IEnumerable<ContactInquiry>> GetAllAsync();
    }
}
