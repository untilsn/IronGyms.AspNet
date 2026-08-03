using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models;

namespace IronGyms.Api.DTOs.Payments;

public class CreatePaymentDto
{
    [Required]
    public Guid MemberMembershipId { get; set; }

    [Required, Range(0.01, double.MaxValue, ErrorMessage = "Số tiền phải lớn hơn 0")]
    public decimal Amount { get; set; }

    [Required]
    public PaymentMethod Method { get; set; }

    public string? Note { get; set; }
}