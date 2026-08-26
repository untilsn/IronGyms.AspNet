namespace IronGyms.Api.DTOs;

public class TrainerDto
{
    public Guid Id { get; set; }
    public string Fullname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string? Specialty { get; set; }
    public string? Bio { get; set; }
    public int? ExperienceYears { get; set; }
    public string? Certifications { get; set; }
    public DateTime JoinedAt { get; set; }
}