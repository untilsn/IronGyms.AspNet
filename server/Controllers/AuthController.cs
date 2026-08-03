using IronGyms.Api.DTOs.Auth;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (result is null)
            return Conflict(new { message = "Email đã được sử dụng" });

        SetAuthCookies(result.Token, result.RefreshToken);
        return Ok(new { id = result.Id, fullname = result.Fullname, email = result.Email, role = result.Role });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (result is null)
            return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });

        SetAuthCookies(result.Token, result.RefreshToken);
        return Ok(new { id = result.Id, fullname = result.Fullname, email = result.Email, role = result.Role });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        if (!Request.Cookies.TryGetValue("refresh_token", out var refreshToken))
            return Unauthorized(new { message = "Không tìm thấy refresh token" });

        var result = await _authService.RefreshTokenAsync(refreshToken);
        if (result is null)
            return Unauthorized(new { message = "Refresh token không hợp lệ hoặc đã hết hạn" });

        SetAuthCookies(result.Token, result.RefreshToken);
        return Ok(new { id = result.Id, fullname = result.Fullname, email = result.Email, role = result.Role });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (Guid.TryParse(userIdClaim, out var userId))
        {
            await _authService.LogoutAsync(userId);
        }

        Response.Cookies.Delete("access_token");
        Response.Cookies.Delete("refresh_token");
        return Ok(new { message = "Đăng xuất thành công" });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = User.FindFirstValue(ClaimTypes.Email);
        var role = User.FindFirstValue(ClaimTypes.Role);

        return Ok(new { id = userId, email, role });
    }

    private void SetAuthCookies(string accessToken, string refreshToken)
    {
        var accessCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,       // đổi thành true khi deploy thật (bắt buộc HTTPS)
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddMinutes(60)
        };
        Response.Cookies.Append("access_token", accessToken, accessCookieOptions);

        var refreshCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };
        Response.Cookies.Append("refresh_token", refreshToken, refreshCookieOptions);
    }
}