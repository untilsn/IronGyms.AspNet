using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models;

namespace IronGyms.Api.DTOs.MemberMemberships;

public class RenewMembershipDto
{
    [Required]
    public PaymentMethod PaymentMethod { get; set; }

    public string? Note { get; set; }
}