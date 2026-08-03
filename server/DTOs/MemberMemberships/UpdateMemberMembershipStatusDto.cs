using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models;

namespace IronGyms.Api.DTOs.MemberMemberships;

public class UpdateMemberMembershipStatusDto
{
    [Required]
    public MembershipStatus Status { get; set; }
}