using IronGyms.Api.DTOs.Dashboard;

namespace IronGyms.Api.Services;

public interface IDashboardService
{
    Task<DashboardSummaryDto?> GetMemberSummaryAsync(Guid userId);
}