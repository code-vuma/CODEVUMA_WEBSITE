using CodeVumaAPI.Data;
using CodeVumaAPI.Repositories;
using CodeVumaAPI.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddEndpointsApiExplorer();
// Configure Swagger security via reflection at runtime to avoid direct compile-time OpenApi type dependencies.
builder.Services.AddSwaggerGen(options =>
{
    var openApiAsm = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.GetName().Name.StartsWith("Microsoft.OpenApi"));
    if (openApiAsm != null)
    {
        var schemeType = openApiAsm.GetType("Microsoft.OpenApi.Models.OpenApiSecurityScheme");
        var refType = openApiAsm.GetType("Microsoft.OpenApi.Models.OpenApiReference");
        var reqType = openApiAsm.GetType("Microsoft.OpenApi.Models.OpenApiSecurityRequirement");
        var paramLocationType = openApiAsm.GetType("Microsoft.OpenApi.Models.ParameterLocation");
        var securitySchemeTypeEnum = openApiAsm.GetType("Microsoft.OpenApi.Models.SecuritySchemeType");
        var referenceTypeEnum = openApiAsm.GetType("Microsoft.OpenApi.Models.ReferenceType");

        if (schemeType != null && refType != null && reqType != null && paramLocationType != null && securitySchemeTypeEnum != null && referenceTypeEnum != null)
        {
            var scheme = Activator.CreateInstance(schemeType);
            schemeType.GetProperty("Name")?.SetValue(scheme, "Authorization");
            schemeType.GetProperty("In")?.SetValue(scheme, Enum.Parse(paramLocationType, "Header"));
            schemeType.GetProperty("Type")?.SetValue(scheme, Enum.Parse(securitySchemeTypeEnum, "Http"));
            schemeType.GetProperty("Scheme")?.SetValue(scheme, "bearer");
            schemeType.GetProperty("BearerFormat")?.SetValue(scheme, "JWT");
            schemeType.GetProperty("Description")?.SetValue(scheme, "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'");

            var addSecDef = options.GetType().GetMethod("AddSecurityDefinition", new[] { typeof(string), schemeType });
            if (addSecDef != null)
                addSecDef.Invoke(options, new object[] { "Bearer", scheme });

            var reference = Activator.CreateInstance(refType);
            refType.GetProperty("Type")?.SetValue(reference, Enum.Parse(referenceTypeEnum, "SecurityScheme"));
            refType.GetProperty("Id")?.SetValue(reference, "Bearer");

            var schemeWithRef = Activator.CreateInstance(schemeType);
            schemeType.GetProperty("Reference")?.SetValue(schemeWithRef, reference);

            var requirement = Activator.CreateInstance(reqType) as System.Collections.IDictionary;
            var listStringType = typeof(System.Collections.Generic.List<string>);
            var emptyList = Activator.CreateInstance(listStringType);
            requirement?.Add(schemeWithRef, emptyList);

            var addSecReq = options.GetType().GetMethod("AddSecurityRequirement", new[] { reqType });
            if (addSecReq != null)
                addSecReq.Invoke(options, new object[] { requirement });
        }
    }
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy => policy
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    var allowedOrigins = builder.Configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>() ?? Array.Empty<string>();

    options.AddPolicy("ProdCors", policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Database (SQLite) - uses a connection string named DefaultConnection or falls back to file-based DB
var conn = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=codevuma.db";
builder.Services.AddDbContext<CodeVumaDbContext>(options => options.UseSqlite(conn));

// Email service: prefer SendGrid when configured, otherwise fallback to SMTP
var sendGridKey = builder.Configuration["SendGrid:ApiKey"] ?? System.Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
if (!string.IsNullOrWhiteSpace(sendGridKey))
    builder.Services.AddScoped<IEmailService, SendGridEmailService>();
else
    builder.Services.AddScoped<IEmailService, SmtpEmailService>();

// DI registrations
builder.Services.AddScoped(typeof(IContactRepository), typeof(ContactRepository));
builder.Services.AddScoped(typeof(IProjectRepository), typeof(ProjectRepository));

// dynamic registration for IContactService -> ContactService to avoid potential compile-time resolution issues
var serviceType = Type.GetType("CodeVumaAPI.Services.ContactService, CodeVumaAPI");
var ifaceType = Type.GetType("CodeVumaAPI.Services.IContactService, CodeVumaAPI");
if (serviceType != null && ifaceType != null)
{
    builder.Services.AddScoped(ifaceType, serviceType);
}
else
{
    // fallback: register concrete type if reflection fails
    if (serviceType != null)
        builder.Services.AddScoped(serviceType);
}

// Register ProjectService via reflection similar to ContactService
var projectServiceType = Type.GetType("CodeVumaAPI.Services.ProjectService, CodeVumaAPI");
var projectIfaceType = Type.GetType("CodeVumaAPI.Services.IProjectService, CodeVumaAPI");
if (projectServiceType != null && projectIfaceType != null)
{
    builder.Services.AddScoped(projectIfaceType, projectServiceType);
}
else
{
    if (projectServiceType != null)
        builder.Services.AddScoped(projectServiceType);
}

// Authentication (JWT)
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"] ?? "dev-key-change-this";
var issuer = jwtSection["Issuer"] ?? "CodeVuma";
var audience = jwtSection["Audience"] ?? "CodeVuma";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(jwtKey))
    };
});
var app = builder.Build();

// Auto-apply EF migrations on startup (creates SQLite schema if it doesn't exist)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CodeVumaDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Intercept the generated swagger JSON and inject a Bearer security scheme if it's missing.
    app.Use(async (context, next) =>
    {
        if (context.Request.Path.StartsWithSegments("/swagger/v1/swagger.json"))
        {
            var originalBody = context.Response.Body;
            await using var mem = new MemoryStream();
            context.Response.Body = mem;
            await next();
            mem.Seek(0, SeekOrigin.Begin);
            using var reader = new StreamReader(mem, Encoding.UTF8);
            var json = await reader.ReadToEndAsync();

            JsonNode? node = null;
            try
            {
                node = JsonNode.Parse(json);
            }
            catch
            {
                node = new JsonObject();
            }

            if (node is JsonObject root)
            {
                var components = root["components"] as JsonObject;
                if (components == null)
                {
                    components = new JsonObject();
                    root["components"] = components;
                }

                var securitySchemes = components["securitySchemes"] as JsonObject;
                if (securitySchemes == null)
                {
                    securitySchemes = new JsonObject();
                    components["securitySchemes"] = securitySchemes;
                }

                if (!securitySchemes.ContainsKey("Bearer"))
                {
                    securitySchemes["Bearer"] = JsonNode.Parse("{\"type\":\"http\",\"scheme\":\"bearer\",\"bearerFormat\":\"JWT\",\"in\":\"header\",\"name\":\"Authorization\",\"description\":\"JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'\"}");
                }

                // ensure top-level security requirement is present
                if (!root.ContainsKey("security"))
                {
                    root["security"] = JsonArray.Parse("[{\"Bearer\":[]}]" );
                }

                var modified = root.ToJsonString(new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                context.Response.ContentLength = Encoding.UTF8.GetByteCount(modified);
                context.Response.Body = originalBody;
                await context.Response.WriteAsync(modified);
                return;
            }

            context.Response.Body = originalBody;
            await context.Response.WriteAsync(json);
            return;
        }

        await next();
    });

    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevCors");
}
else
{
    // Railway terminates TLS at the proxy — don't redirect internally.
    app.UseCors("ProdCors");
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
