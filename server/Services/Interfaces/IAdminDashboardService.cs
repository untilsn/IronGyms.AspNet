using IronGyms.Api.DTOs.Dashboard;

namespace IronGyms.Api.Services;

public interface IAdminDashboardService
{
    Task<DashboardStatsDto> GetOverviewStatsAsync();

    Task<RevenueChartDto> GetRevenueTrendAsync(int months);

    Task<CheckInsChartDto> GetCheckInsTrendAsync(int days);

    Task<List<PlanDistributionDto>> GetPlanDistributionAsync();

    Task<List<ExpiringMembershipDto>> GetExpiringMembershipsAsync(int withinDays);
}