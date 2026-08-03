using IronGyms.Api.DTOs.MemberMemberships;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface IMemberMembershipService
{
    Task<List<MemberMembership>> GetAllAsync();
    Task<List<MemberMembership>> GetByMemberIdAsync(Guid memberId);
    Task<MemberMembership?> GetByIdAsync(Guid id);
    Task<MemberMembership?> CreateAsync(CreateMemberMembershipDto dto);
    Task<MemberMembership?> UpdateStatusAsync(Guid id, UpdateMemberMembershipStatusDto dto);
}