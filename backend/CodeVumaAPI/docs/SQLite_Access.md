# SQLite Access

The API uses a local SQLite file at `backend/CodeVumaAPI/codevuma.db`.

## Connection String

Set in `appsettings.json` (optional — defaults to `Data Source=codevuma.db` if absent):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=codevuma.db"
  }
}
```

## Viewing the Database

### Option 1 — DB Browser for SQLite (GUI)
Download from https://sqlitebrowser.org and open `codevuma.db`.

### Option 2 — sqlite3 CLI
```bash
sqlite3 backend/CodeVumaAPI/codevuma.db
.tables
SELECT * FROM Projects;
SELECT * FROM ContactInquiries;
.quit
```

### Option 3 — VS Code Extension
Install **SQLite Viewer** or **SQLite** extension, then open `codevuma.db` directly in VS Code.

## Running Migrations

```bash
# From the project root
dotnet ef database update --project backend/CodeVumaAPI/CodeVumaAPI.csproj

# Add a new migration
dotnet ef migrations add <MigrationName> --project backend/CodeVumaAPI/CodeVumaAPI.csproj

# Pending: create Subscribers table
dotnet ef migrations add AddSubscribers --project backend/CodeVumaAPI/CodeVumaAPI.csproj
dotnet ef database update --project backend/CodeVumaAPI/CodeVumaAPI.csproj
```

## Current Tables

| Table | Description |
|-------|-------------|
| `ContactInquiries` | Contact form submissions |
| `Projects` | Portfolio projects (CRUD via API) |
| `Subscribers` | Newsletter subscribers *(migration pending)* |
| `__EFMigrationsHistory` | EF Core migration tracking |
