namespace IronGyms.Api.DTOs.Members;

public class UpdateMemberDto
{
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}