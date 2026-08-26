using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs;

public class CreateMemberDto

{
    [Required, MaxLength(100)]
    public string Fullname {get; set;}  = string.Empty;

    [Required, EmailAddress]
    public string Email {get; set;}  = string.Empty;
}