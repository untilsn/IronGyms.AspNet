using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.MemberMemberships;

public class CreateMemberMembershipDto
{
    [Required]
    public Guid MemberId { get; set; }

    [Required]
    public Guid MembershipPlanId { get; set; }

    // Không bắt buộc — nếu không truyền thì mặc định bắt đầu từ hôm nay
    public DateTime? StartDate { get; set; }
}