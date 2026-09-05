using IronGyms.Api.DTOs.Auth;

namespace IronGyms.Api.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken);
    Task<(bool Success, string? Error)> ChangePasswordAsync(Guid userId, ChangePasswordDto dto);
    Task<bool> LogoutAsync(Guid userId);
    Task<MeDto?> GetMeAsync(Guid userId);
}