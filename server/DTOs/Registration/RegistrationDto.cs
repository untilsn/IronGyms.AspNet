using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models; // thêm dòng này để dùng được enum PaymentMethod

namespace IronGyms.Api.DTOs.Registration;

public class CreateRegistrationDto
{
    [Required]
    public Guid MembershipPlanId { get; set; }

    [Required]
    public PaymentMethod PaymentMethod { get; set; }

    public string? Note { get; set; }
}

public class RenewRegistrationDto
{
    [Required]
    public PaymentMethod PaymentMethod { get; set; }

    public string? Note { get; set; }
}