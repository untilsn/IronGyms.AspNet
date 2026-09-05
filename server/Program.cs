using IronGyms.Api.Data;
using IronGyms.Api.Services;
using Microsoft.OpenApi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CloudinaryDotNet;

var builder = WebApplication.CreateBuilder(args);

// =====================================================
// Controllers
// =====================================================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();


// =====================================================
// Swagger
// =====================================================

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description =
            "Nhập token JWT (không cần gõ chữ Bearer, Swagger tự thêm)."
    });

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference("bearer", document)] = []
        });
});


// =====================================================
// Cloudinary
// =====================================================

// appsettings.json:
// "Cloudinary": {
//     "CloudName": "...",
//     "ApiKey": "...",
//     "ApiSecret": "..."
// }

var cloudinarySettings = builder.Configuration
    .GetSection("Cloudinary");

var cloudName = cloudinarySettings["CloudName"];
var apiKey = cloudinarySettings["ApiKey"];
var apiSecret = cloudinarySettings["ApiSecret"];

if (string.IsNullOrWhiteSpace(cloudName))
{
    throw new InvalidOperationException(
        "Cloudinary:CloudName chưa được cấu hình trong appsettings.json."
    );
}

if (string.IsNullOrWhiteSpace(apiKey))
{
    throw new InvalidOperationException(
        "Cloudinary:ApiKey chưa được cấu hình trong appsettings.json."
    );
}

if (string.IsNullOrWhiteSpace(apiSecret))
{
    throw new InvalidOperationException(
        "Cloudinary:ApiSecret chưa được cấu hình trong appsettings.json."
    );
}

var account = new Account(
    cloudName,
    apiKey,
    apiSecret
);

var cloudinary = new Cloudinary(account);

builder.Services.AddSingleton(cloudinary);


// =====================================================
// Database - PostgreSQL
// =====================================================

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    );
});


// =====================================================
// HttpContext
// =====================================================

builder.Services.AddHttpContextAccessor();


// =====================================================
// Services
// =====================================================

builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMemberMembershipService, MemberMembershipService>();
builder.Services.AddScoped<IMembershipPlanService, MembershipPlanService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<ICheckInService, CheckInService>();
builder.Services.AddScoped<ITrainerService, TrainerService>();
builder.Services.AddScoped<ITrainingScheduleService, TrainingScheduleService>();
builder.Services.AddScoped<IMemberDashboardService, DashboardService>();
builder.Services.AddScoped<IAdminDashboardService, DashboardService>();

builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();


// =====================================================
// Authentication - JWT
// =====================================================

var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "Jwt:Key chưa được cấu hình trong appsettings.json."
    );
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            )
    };

    // =================================================
    // Đọc JWT từ cookie access_token
    // =================================================

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.TryGetValue(
                "access_token",
                out var token))
            {
                context.Token = token;
            }

            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();


// =====================================================
// CORS - React
// =====================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


// =====================================================
// Build application
// =====================================================

var app = builder.Build();


// =====================================================
// Database Seeder
// =====================================================

using (var scope = app.Services.CreateScope())
{
    var context =
        scope.ServiceProvider.GetRequiredService<AppDbContext>();

    await DbSeeder.SeedAsync(context);
}


// =====================================================
// Swagger - Development only
// =====================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// =====================================================
// Middleware
// =====================================================

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();

app.UseAuthorization();


// =====================================================
// Controllers
// =====================================================

app.MapControllers();


// =====================================================
// Run
// =====================================================

app.Run();