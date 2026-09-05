using IronGyms.Api.DTOs.Dashboard;

namespace IronGyms.Api.Services;

public interface IMemberDashboardService
{
    Task<DashboardSummaryDto?> GetMemberSummaryAsync(Guid userId);
}