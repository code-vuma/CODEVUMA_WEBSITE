using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CodeVumaAPI.Data;
using CodeVumaAPI.Models;

namespace CodeVumaAPI.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly CodeVumaDbContext _db;

        public ContactRepository(CodeVumaDbContext db)
        {
            _db = db;
        }

        public async Task<ContactInquiry> AddAsync(ContactInquiry inquiry)
        {
            inquiry.CreatedAt = DateTime.UtcNow;
            _db.ContactInquiries.Add(inquiry);
            await _db.SaveChangesAsync();
            return inquiry;
        }

        public async Task<IEnumerable<ContactInquiry>> GetAllAsync()
        {
            return await _db.ContactInquiries.AsNoTracking().ToListAsync();
        }
    }
}
