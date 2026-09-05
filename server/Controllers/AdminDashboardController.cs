using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/admin/dashboard")]
[Authorize(Roles = "Admin,Staff")]
public class AdminDashboardController : ControllerBase
{
    private readonly IAdminDashboardService _dashboardService;

    public AdminDashboardController(
        IAdminDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
        => Ok(await _dashboardService.GetOverviewStatsAsync());

    [HttpGet("revenue-chart")]
    public async Task<IActionResult> GetRevenueChart([FromQuery] int months = 6)
        => Ok(await _dashboardService.GetRevenueTrendAsync(months));

    [HttpGet("checkins-chart")]
    public async Task<IActionResult> GetCheckInsChart([FromQuery] int days = 7)
        => Ok(await _dashboardService.GetCheckInsTrendAsync(days));

    [HttpGet("plan-distribution")]
    public async Task<IActionResult> GetPlanDistribution()
        => Ok(await _dashboardService.GetPlanDistributionAsync());

    [HttpGet("expiring-memberships")]
    public async Task<IActionResult> GetExpiringMemberships([FromQuery] int withinDays = 7)
        => Ok(await _dashboardService.GetExpiringMembershipsAsync(withinDays));
}