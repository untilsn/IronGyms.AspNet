using IronGyms.Api.DTOs.MembershipPlans;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface IMembershipPlanService
{
    Task<List<MembershipPlan>> GetAllAsync();
    Task<MembershipPlan?> GetByIdAsync(Guid id);
    Task<MembershipPlan> CreateAsync(CreateMembershipPlanDto dto);
    Task<MembershipPlan?> UpdateAsync(Guid id, UpdateMembershipPlanDto dto);
    Task<bool> DeleteAsync(Guid id);
}