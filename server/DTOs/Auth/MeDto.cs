namespace IronGyms.Api.DTOs.Auth;

public class MeDto
{
    public Guid Id { get; set; }
    public string Fullname { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}