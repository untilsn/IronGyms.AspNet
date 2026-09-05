using IronGyms.Api.DTOs.MemberMemberships;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface IMemberMembershipService
{
    Task<List<MemberMembership>> GetAllAsync();
    Task<List<MemberMembership>> GetByMemberIdAsync(Guid memberId);
    Task<MemberMembership?> GetByIdAsync(Guid id);

    // Admin tạo hộ — MemberId lấy từ dto
    Task<MemberMembership?> CreateAsync(CreateMemberMembershipDto dto);

    // Member tự đăng ký — memberId suy ra từ userId đăng nhập
    Task<MemberMembership?> SubscribeAsync(Guid userId, SubscribeMembershipDto dto);

    // Member tự gia hạn gói đang có
    Task<MemberMembership?> RenewAsync(Guid membershipId, RenewMembershipDto dto);

    Task<MemberMembership?> UpdateStatusAsync(Guid id, UpdateMemberMembershipStatusDto dto);
}