# Backend Subsystem 2 — Projects API

## Summary

Implemented full CRUD for portfolio projects, plus the auth layer (JWT), email service abstractions (SendGrid + SMTP), and subscriber infrastructure.

## Files Created / Modified

- Domain: [backend/CodeVumaAPI/Models/Project.cs](../Models/Project.cs), [backend/CodeVumaAPI/Models/Subscriber.cs](../Models/Subscriber.cs)
- Data: [backend/CodeVumaAPI/Data/CodeVumaDbContext.cs](../Data/CodeVumaDbContext.cs) — added `Projects` and `Subscribers` DbSets
- Repositories: [IProjectRepository.cs](../Repositories/IProjectRepository.cs), [ProjectRepository.cs](../Repositories/ProjectRepository.cs), [ISubscriberRepository.cs](../Repositories/ISubscriberRepository.cs), [SubscriberRepository.cs](../Repositories/SubscriberRepository.cs)
- Services: [IProjectService.cs](../Services/IProjectService.cs), [ProjectService.cs](../Services/ProjectService.cs), [ISubscriberService.cs](../Services/ISubscriberService.cs), [SubscriberService.cs](../Services/SubscriberService.cs), [IEmailService.cs](../Services/IEmailService.cs), [SendGridEmailService.cs](../Services/SendGridEmailService.cs), [SmtpEmailService.cs](../Services/SmtpEmailService.cs)
- API Surface: [ProjectsController.cs](../Controllers/ProjectsController.cs), [AuthController.cs](../Controllers/AuthController.cs), [UsersController.cs](../Controllers/UsersController.cs), [UsersAdminController.cs](../Controllers/UsersAdminController.cs)
- Migrations: [20260615191950_AddProjects.cs](../Migrations/20260615191950_AddProjects.cs)

## Architecture Decisions

- Auth: single config-based admin (no user table). JWT issued on valid email/password match against `Admin:*` config values. Token lifetime: 8 hours.
- Projects: full CRUD, GET is public, write endpoints require `[Authorize]`.
- Email: `IEmailService` abstraction with two implementations selected at startup — SendGrid when `SendGrid:ApiKey` is set, SMTP otherwise.
- Subscriber: stores email + timestamp in DB, checks for duplicates, sends confirmation via `IEmailService`.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Issue JWT |
| GET | `/api/users/me` | Yes | Current user info |
| GET | `/api/projects` | No | List projects |
| GET | `/api/projects/{id}` | No | Get project |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/{id}` | Yes | Update project |
| DELETE | `/api/projects/{id}` | Yes | Delete project |
| GET | `/api/admin/usersadmin/subscribers` | Yes | List subscribers |

## Database / Migration

- Migration `AddProjects` (2026-06-15): creates `Projects` table
- `Subscribers` table: add via `dotnet ef migrations add AddSubscribers` then `dotnet ef database update`
- Local DB file: `backend/CodeVumaAPI/codevuma.db`

## Risks / Technical Debt

- Admin password is plaintext in config — acceptable for a personal portfolio, but should use a hash if multi-user auth is ever needed.
- Subscriber migration still pending — subscriber endpoints will throw until applied.
- No rate limiting on `/api/auth/login`.

## Next Suggested Steps

- Run `dotnet ef migrations add AddSubscribers && dotnet ef database update` to create the Subscribers table.
- Add a public POST `/api/subscribers` endpoint wired to `ISubscriberService.SubscribeAsync`.
- Wire the frontend contact form to POST `/api/contact`.
- Add CI workflow (build + test).

---
Generated: 2026-06-15
