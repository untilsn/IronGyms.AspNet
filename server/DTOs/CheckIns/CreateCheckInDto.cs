using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.CheckIns;

public class CreateCheckInDto
{
    [Required]
    public Guid MemberId { get; set; }
}