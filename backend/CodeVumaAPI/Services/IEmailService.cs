using System.Threading.Tasks;

namespace CodeVumaAPI.Services
{
    public interface IEmailService
    {
        Task SendAsync(string to, string subject, string htmlBody, string? replyTo = null);
    }
}
