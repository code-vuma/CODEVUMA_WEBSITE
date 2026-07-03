using System.Collections.Generic;
using System.Threading.Tasks;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Repositories
{
    public interface IContactRepository
    {
        Task<ContactInquiry> AddAsync(ContactInquiry inquiry);
        Task<IEnumerable<ContactInquiry>> GetAllAsync();
    }
}
