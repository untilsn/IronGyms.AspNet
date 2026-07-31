using System.ComponentModel.DataAnnotations;



namespace IronGyms.Api.DTOs.Auth;


public class RegisterDto
{
    [Required, MaxLength(50)]
    public string Fullname { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8)]
    public string Password { get; set; } = string.Empty;
}