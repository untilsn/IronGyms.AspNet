namespace IronGyms.Api.Models;

public class CheckIn
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public DateTime CheckInTime { get; set; } = DateTime.UtcNow;
}