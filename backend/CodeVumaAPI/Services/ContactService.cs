using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CodeVumaAPI.Models;
using CodeVumaAPI.Repositories;

namespace CodeVumaAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _repo;
        private readonly IEmailService _email;
        private readonly ILogger<ContactService> _logger;
        private readonly string _notifyEmail;

        public ContactService(IContactRepository repo, IEmailService email,
            IConfiguration config, ILogger<ContactService> logger)
        {
            _repo = repo;
            _email = email;
            _logger = logger;
            _notifyEmail = config["Contact:NotifyEmail"] ?? "info@codevuma.co.za";
        }

        public Task<IEnumerable<ContactInquiry>> GetAllAsync() => _repo.GetAllAsync();

        public async Task<ContactInquiry> SubmitAsync(string name, string email, string message)
        {
            var inquiry = new ContactInquiry { Name = name, Email = email, Message = message };
            var saved = await _repo.AddAsync(inquiry);

            var safeName    = System.Net.WebUtility.HtmlEncode(name);
            var safeEmail   = System.Net.WebUtility.HtmlEncode(email);
            var safeMessage = System.Net.WebUtility.HtmlEncode(message).Replace("\n", "<br>");

            var html = $@"<!DOCTYPE html>
<html lang=""en"">
<head><meta charset=""utf-8""><meta name=""viewport"" content=""width=device-width,initial-scale=1""></head>
<body style=""margin:0;padding:40px 0;background:#f1f5f9;font-family:Arial,sans-serif;"">
  <div style=""max-width:560px;margin:0 auto;"">

    <!-- Header -->
    <div style=""background:#0D1230;border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;"">
      <span style=""font-size:22px;font-weight:700;color:#ffffff;"">
        Code<span style=""color:#2563EB;"">Vuma</span>
      </span>
    </div>

    <!-- Body -->
    <div style=""background:#ffffff;padding:36px;"">
      <h2 style=""margin:0 0 6px;font-size:20px;color:#0D1230;"">New Contact Inquiry</h2>
      <p style=""margin:0 0 28px;font-size:14px;color:#5A6481;"">
        Someone submitted the contact form on codevuma.co.za.
      </p>

      <!-- Fields -->
      <table width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""background:#f8fafc;border-radius:12px;padding:24px;"">
        <tr>
          <td style=""padding-bottom:16px;"">
            <div style=""font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#5A6481;margin-bottom:4px;"">Name</div>
            <div style=""font-size:15px;font-weight:600;color:#0D1230;"">{safeName}</div>
          </td>
        </tr>
        <tr>
          <td style=""padding-bottom:16px;border-top:1px solid #e5e7eb;padding-top:16px;"">
            <div style=""font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#5A6481;margin-bottom:4px;"">Email</div>
            <div style=""font-size:15px;"">
              <a href=""mailto:{safeEmail}"" style=""color:#2563EB;text-decoration:none;font-weight:500;"">{safeEmail}</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style=""border-top:1px solid #e5e7eb;padding-top:16px;"">
            <div style=""font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#5A6481;margin-bottom:8px;"">Message</div>
            <div style=""font-size:15px;color:#0D1230;line-height:1.65;"">{safeMessage}</div>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <div style=""text-align:center;margin-top:28px;"">
        <a href=""mailto:{safeEmail}?subject=Re: Your message to CodeVuma""
           style=""display:inline-block;background:#2563EB;color:#ffffff;padding:13px 28px;
                  border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;"">
          Reply to {safeName} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style=""background:#f8fafc;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;"">
      <p style=""margin:0;font-size:12px;color:#5A6481;"">
        Sent from the contact form on
        <a href=""https://codevuma.co.za"" style=""color:#2563EB;text-decoration:none;"">codevuma.co.za</a>
      </p>
    </div>

  </div>
</body>
</html>";

            try
            {
                await _email.SendAsync(
                    to: _notifyEmail,
                    subject: $"New message from {name}",
                    htmlBody: html,
                    replyTo: email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Failed to send contact notification for inquiry {InquiryId} from {Email}",
                    saved.Id, email);
            }

            return saved;
        }
    }
}
