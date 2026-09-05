using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models;

namespace IronGyms.Api.DTOs.MemberMemberships;

public class SubscribeMembershipDto
{
    [Required]
    public Guid MembershipPlanId { get; set; }

    [Required]
    public PaymentMethod PaymentMethod { get; set; }

    public string? Note { get; set; }
}