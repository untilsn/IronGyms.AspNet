namespace IronGyms.Api.DTOs;

public class MemberDto
{
    public Guid Id { get; set; }
    public string Fullname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
    public DateTime JoinedAt { get; set; }
}