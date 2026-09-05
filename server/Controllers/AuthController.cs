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
    private readonly IConfiguration _config;

    public AuthController(IAuthService authService, IConfiguration config)
    {
        _authService = authService;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (result is null)
            return Conflict(new { message = "Email đã được sử dụng" });

        SetAuthCookies(result.Token, result.RefreshToken);
        return Ok(new { result.Id, result.Fullname, result.AvatarUrl, result.Email, result.Role });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (result is null)
            return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });

        SetAuthCookies(result.Token, result.RefreshToken);
        // Không trả token/refreshToken ra body nữa — chúng đã nằm trong HttpOnly cookie
        return Ok(new { result.Id, result.Fullname, result.AvatarUrl, result.Email, result.Role });
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
        return Ok(new { result.Id, result.Fullname, result.AvatarUrl, result.Email, result.Role });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var (success, error) = await _authService.ChangePasswordAsync(userId, dto);
        if (!success)
            return BadRequest(new { message = error });

        // Xoá cookie hiện tại — vì refresh token đã bị thu hồi, cookie cũ không còn dùng được nữa
        Response.Cookies.Delete("access_token");
        Response.Cookies.Delete("refresh_token");

        return Ok(new { message = "Đổi mật khẩu thành công. Vui lòng đăng nhập lại." });
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
    public async Task<IActionResult> Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id)) return Unauthorized();

        var me = await _authService.GetMeAsync(id);
        if (me is null) return NotFound();

        return Ok(me);
    }

    private void SetAuthCookies(string accessToken, string refreshToken)
    {
        var accessCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,              // để false lúc dev (http), sẽ sửa lại khi deploy
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddMinutes(
                double.Parse(_config["Jwt:ExpiresInMinutes"]!))
        };

        var refreshCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("access_token", accessToken, accessCookieOptions);
        Response.Cookies.Append("refresh_token", refreshToken, refreshCookieOptions);
    }
}