using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("member-summary")]
    public async Task<IActionResult> GetMemberSummary()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id)) return Unauthorized();

        var summary = await _dashboardService.GetMemberSummaryAsync(id);
        if (summary is null)
            return NotFound(new { message = "Không tìm thấy hồ sơ Member cho tài khoản này" });

        return Ok(summary);
    }
}