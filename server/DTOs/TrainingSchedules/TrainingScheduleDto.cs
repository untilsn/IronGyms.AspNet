// DTOs/TrainingSchedules/TrainingScheduleDto.cs
namespace IronGyms.Api.DTOs.TrainingSchedules;

public class TrainingScheduleDto
{
    public Guid Id { get; set; }
    public Guid TrainerId { get; set; }
    public string TrainerName { get; set; } = string.Empty;
    public Guid MemberId { get; set; }
    public string MemberName { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; } = string.Empty;
}