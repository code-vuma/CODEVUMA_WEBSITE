# CodeVuma API Reference

Base URL (dev): `http://localhost:5168`

Swagger UI: `http://localhost:5168/swagger`

---

## Auth

### POST `/api/auth/login`
Returns a JWT bearer token. All protected endpoints require `Authorization: Bearer <token>`.

**Body:**
```json
{ "email": "admin@codevuma.com", "password": "changeme" }
```
**Response:**
```json
{ "token": "<jwt>" }
```

---

## Contact

### POST `/api/contact`
Submit a contact inquiry. **Public.**

**Body:**
```json
{ "name": "Jane", "email": "jane@example.com", "message": "Hello!" }
```

**Validation:**
- `name` — required, max 100 characters
- `email` — required, valid email format, max 200 characters
- `message` — required, max 2000 characters

**Response:** `201 Created`
```json
{ "status": "success", "messageId": 1 }
```

### GET `/api/contact`
List all contact inquiries. **Requires auth.**

---

## Projects

### GET `/api/projects`
List all portfolio projects. **Public.**

### GET `/api/projects/{id}`
Get a single project by ID. **Public.**

### POST `/api/projects`
Create a project. **Requires auth.**

**Body:**
```json
{ "title": "My App", "description": "...", "url": "https://...", "imageUrl": "https://..." }
```

**Validation:**
- `title` — required, max 200 characters
- `description` — required, max 2000 characters
- `url` — optional; when provided must be a valid absolute URL, max 500 characters
- `imageUrl` — optional; same rules as `url`

### PUT `/api/projects/{id}`
Update a project. **Requires auth.** Same body and validation as POST.

### DELETE `/api/projects/{id}`
Delete a project. **Requires auth.**

---

## Users

### GET `/api/users/me`
Returns the authenticated admin's email and role from the JWT. **Requires auth.**

**Response:**
```json
{ "email": "admin@codevuma.com", "role": "admin" }
```
