# Admin Setup

The API uses a single admin account configured via `appsettings.json` (or environment variables). There is no user database — credentials are read from config at login time and a JWT is issued.

---

## Setting Admin Credentials

Add the following to `appsettings.json` (or `appsettings.Development.json` for local dev):

```json
{
  "Admin": {
    "Email": "admin@codevuma.com",
    "Password": "your-secure-password"
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-chars-long",
    "Issuer": "CodeVuma",
    "Audience": "CodeVuma"
  }
}
```

**Never commit real credentials.** Use environment variables in production:

```
Admin__Email=admin@codevuma.com
Admin__Password=your-secure-password
Jwt__Key=your-secret-key-min-32-chars-long
```

---

## Logging In

```http
POST http://localhost:5168/api/auth/login
Content-Type: application/json

{ "email": "admin@codevuma.com", "password": "your-secure-password" }
```

Copy the `token` from the response. In Swagger UI, click **Authorize** and enter:

```
Bearer <your-token>
```

The token is valid for **8 hours**.

---

## Protected Operations

With a valid token you can:
- Create / update / delete portfolio projects (`/api/projects`)
- View newsletter subscribers (`/api/admin/usersadmin/subscribers`)
- Get current user info (`/api/users/me`)

---

## SendGrid Email (optional)

To enable transactional email (subscriber confirmations), add:

```json
{
  "SendGrid": {
    "ApiKey": "SG.xxxx",
    "FromEmail": "noreply@codevuma.com",
    "FromName": "CodeVuma"
  }
}
```

If `SendGrid:ApiKey` is absent, the API falls back to SMTP:

```json
{
  "Smtp": {
    "Host": "smtp.example.com",
    "Port": "587",
    "Username": "user",
    "Password": "pass",
    "FromEmail": "noreply@codevuma.com"
  }
}
```
