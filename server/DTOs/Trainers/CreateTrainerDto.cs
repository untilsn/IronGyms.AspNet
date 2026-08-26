using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.Trainers;

public class CreateTrainerDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Fullname { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string Password { get; set; } = string.Empty;

    public string? Specialty { get; set; }
    public string? Bio { get; set; }

    [Range(0, 60)]
    public int? ExperienceYears { get; set; }
    public string? Certifications { get; set; }
}