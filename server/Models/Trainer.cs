namespace IronGyms.Api.Models;

public class Trainer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public string? Specialty { get; set; }
    public string? Bio { get; set; }
    public int? ExperienceYears { get; set; }
    public string? Certifications { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}