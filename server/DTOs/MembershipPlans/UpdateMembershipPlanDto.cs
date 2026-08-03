using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.MembershipPlans;

public class UpdateMembershipPlanDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required, Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Required, Range(1, 3650)]
    public int DurationInDays { get; set; }

    public bool IsActive { get; set; } = true;
}