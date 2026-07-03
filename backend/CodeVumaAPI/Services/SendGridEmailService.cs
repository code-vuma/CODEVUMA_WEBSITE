using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CodeVumaAPI.Services
{
    public class SendGridEmailService : IEmailService
    {
        private readonly string _apiKey;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public SendGridEmailService(IConfiguration config)
        {
            _apiKey = config["SendGrid:ApiKey"] ?? System.Environment.GetEnvironmentVariable("SENDGRID_API_KEY") ?? string.Empty;
            _fromEmail = config["SendGrid:FromEmail"] ?? "noreply@codevuma.co.za";
            _fromName = config["SendGrid:FromName"] ?? "CodeVuma";
        }

        public async Task SendAsync(string to, string subject, string htmlBody, string? replyTo = null)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress(_fromEmail, _fromName);
            var toAddress = new EmailAddress(to);
            var msg = MailHelper.CreateSingleEmail(from, toAddress, subject, null, htmlBody);
            if (!string.IsNullOrEmpty(replyTo))
                msg.ReplyTo = new EmailAddress(replyTo);
            await client.SendEmailAsync(msg);
        }
    }
}
