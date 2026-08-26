namespace IronGyms.Api.DTOs.Trainers;

public class UpdateTrainerDto
{
    public string? Specialty { get; set; }
    public string? Bio { get; set; }
    public int? ExperienceYears { get; set; }
    public string? Certifications { get; set; }
}