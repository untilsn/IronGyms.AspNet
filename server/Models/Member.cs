namespace IronGyms.Api.Models;

public class Member
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public DateTime? DateOfBirth { get; set; }
    public string? Address { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}