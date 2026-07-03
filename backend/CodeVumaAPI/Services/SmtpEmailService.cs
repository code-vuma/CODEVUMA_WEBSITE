using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace CodeVumaAPI.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public SmtpEmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendAsync(string to, string subject, string htmlBody, string? replyTo = null)
        {
            var host       = _config["Smtp:Host"]      ?? "smtp.gmail.com";
            var port       = int.TryParse(_config["Smtp:Port"], out var p) ? p : 587;
            var user       = _config["Smtp:Username"]  ?? string.Empty;
            var pass       = _config["Smtp:Password"]  ?? string.Empty;
            var from       = _config["Smtp:FromEmail"] ?? "noreply@codevuma.co.za";
            var enableSsl  = !bool.TryParse(_config["Smtp:EnableSsl"], out var ssl) || ssl; // default true

            using var client = new SmtpClient(host, port)
            {
                EnableSsl        = enableSsl,
                DeliveryMethod   = System.Net.Mail.SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
            };

            if (!string.IsNullOrEmpty(user))
                client.Credentials = new NetworkCredential(user, pass);

            using var message = new MailMessage(from, to, subject, htmlBody) { IsBodyHtml = true };
            if (!string.IsNullOrEmpty(replyTo))
                message.ReplyToList.Add(new MailAddress(replyTo));

            await client.SendMailAsync(message);
        }
    }
}
