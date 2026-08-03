using System.ComponentModel.DataAnnotations;
using IronGyms.Api.Models;

namespace IronGyms.Api.DTOs.TrainingSchedules;

public class UpdateTrainingScheduleStatusDto
{
    [Required]
    public SessionStatus Status { get; set; }
}