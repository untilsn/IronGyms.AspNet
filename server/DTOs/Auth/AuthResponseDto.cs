namespace IronGyms.Api.DTOs.Auth;

public class AuthResponseDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Fullname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;

}