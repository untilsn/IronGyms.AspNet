namespace IronGyms.Api.Models;

public enum SessionStatus { Booked, Completed, Cancelled, NoShow }

public class TrainingSchedule
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid TrainerId { get; set; }
    public Trainer Trainer { get; set; } = null!;

    public Guid MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public SessionStatus Status { get; set; } = SessionStatus.Booked;
}