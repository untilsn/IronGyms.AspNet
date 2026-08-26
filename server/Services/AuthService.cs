using IronGyms.Api.Data;
using IronGyms.Api.DTOs.Auth;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace IronGyms.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<AuthResponseDto?> RegisterAsync(RegisterDto dto)
    {
        var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (exists) return null;

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.Member
        };
        _context.Users.Add(user);

        var profile = new UserProfile
        {
            UserId = user.Id,
            User = user,
            Fullname = dto.Fullname
        };
        _context.UserProfiles.Add(profile);
        user.Profile = profile;

        var member = new Member { UserId = user.Id, User = user };
        _context.Members.Add(member);

        await SetRefreshTokenAsync(user);
        await _context.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user is null) return null;

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!isPasswordValid || !user.IsActive) return null;

        await SetRefreshTokenAsync(user);
        await _context.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    public async Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        if (user is null) return null;
        if (user.RefreshTokenExpiresAt is null || user.RefreshTokenExpiresAt < DateTime.UtcNow)
            return null;

        await SetRefreshTokenAsync(user);
        await _context.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    public async Task<bool> LogoutAsync(Guid userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user is null) return false;

        user.RefreshToken = null;
        user.RefreshTokenExpiresAt = null;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<MeDto?> GetMeAsync(Guid userId)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null) return null;

        return new MeDto
        {
            Id = user.Id,
            Fullname = user.Profile.Fullname,
            AvatarUrl = user.Profile.AvatarUrl,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }

    private async Task SetRefreshTokenAsync(User user)
    {
        user.RefreshToken = GenerateRefreshToken();
        user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
        await Task.CompletedTask;
    }

    private static string GenerateRefreshToken()
    {
        var randomBytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(randomBytes);
    }

    private AuthResponseDto BuildAuthResponse(User user)
    {
        return new AuthResponseDto
        {
            Id = user.Id,
            Fullname = user.Profile.Fullname,
            AvatarUrl = user.Profile.AvatarUrl,
            Email = user.Email,
            Role = user.Role.ToString(),
            Token = GenerateJwtToken(user),
            RefreshToken = user.RefreshToken!
        };
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresInMinutes = double.Parse(_config["Jwt:ExpiresInMinutes"]!);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}