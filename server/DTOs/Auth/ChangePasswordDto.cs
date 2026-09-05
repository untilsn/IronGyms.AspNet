using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.Auth;

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required, MinLength(6, ErrorMessage = "Mật khẩu mới phải có ít nhất 6 ký tự")]
    public string NewPassword { get; set; } = string.Empty;

    [Required, Compare(nameof(NewPassword), ErrorMessage = "Xác nhận mật khẩu không khớp")]
    public string ConfirmPassword { get; set; } = string.Empty;
}