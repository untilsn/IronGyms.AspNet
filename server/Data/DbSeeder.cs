using IronGyms.Api.Models;

namespace IronGyms.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        // Nếu đã có Admin rồi thì không tạo lại
        var adminExists = context.Users.Any(u => u.Role == UserRole.Admin);
        if (adminExists) return;

        var admin = new User
        {
            Fullname = "System Admin",
            Email = "admin@irongyms.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = UserRole.Admin,
            IsActive = true
        };

        context.Users.Add(admin);
        await context.SaveChangesAsync();
    }
}