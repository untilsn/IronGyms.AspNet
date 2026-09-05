using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize] // bất kỳ role nào đã đăng nhập đều gọi được — vì đây là hành động "cho chính mình"
public class UsersController : ControllerBase
{
    private readonly IUserProfileService _userProfileService;

    public UsersController(IUserProfileService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    [HttpPost("me/avatar")]
    public async Task<IActionResult> UploadMyAvatar(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { message = "Vui lòng chọn file ảnh" });

        if (file.Length > 2 * 1024 * 1024)
            return BadRequest(new { message = "Ảnh không được vượt quá 2MB" });

        var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
        if (!allowedTypes.Contains(file.ContentType))
            return BadRequest(new { message = "Chỉ chấp nhận định dạng JPEG, PNG, WebP" });

        // Lấy userId từ JWT — không nhận id qua URL, nên không ai đổi được
        // avatar của người khác dù có sửa request
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var avatarUrl = await _userProfileService.UploadAvatarAsync(userId, file);
        if (avatarUrl is null)
            return NotFound(new { message = "Không tìm thấy hồ sơ người dùng" });

        return Ok(new { avatarUrl });
    }
}