using IronGyms.Api.DTOs.Auth;

namespace IronGyms.Api.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken);
    Task<bool> LogoutAsync(Guid userId);
}