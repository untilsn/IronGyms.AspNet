using System.ComponentModel.DataAnnotations;

namespace IronGyms.Api.DTOs.TrainingSchedules;

public class CreateTrainingScheduleDto
{
    [Required]
    public Guid TrainerId { get; set; }

    [Required]
    public Guid MemberId { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    [Required]
    public DateTime EndTime { get; set; }
}