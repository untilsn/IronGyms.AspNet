using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.MembershipPlans;

public class CreateMembershipPlanDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required, Range(0, double.MaxValue, ErrorMessage = "Giá phải lớn hơn hoặc bằng 0")]
    public decimal Price { get; set; }

    [Required, Range(1, 3650, ErrorMessage = "Thời hạn phải từ 1 đến 3650 ngày")]
    public int DurationInDays { get; set; }
}