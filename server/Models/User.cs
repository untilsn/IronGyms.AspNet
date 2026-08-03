using System.Text.Json.Serialization;

namespace IronGyms.Api.Models;

public enum UserRole { Admin, Staff, Trainer, Member }

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Fullname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    [JsonIgnore]   // ← không bao giờ xuất hiện trong response JSON
    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Member;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [JsonIgnore]   // ← cũng nhạy cảm, không nên lộ ra ngoài
    public string? RefreshToken { get; set; }

    [JsonIgnore]
    public DateTime? RefreshTokenExpiresAt { get; set; }
}