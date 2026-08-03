using IronGyms.Api.DTOs.TrainingSchedules;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface ITrainingScheduleService
{
    Task<List<TrainingSchedule>> GetAllAsync();
    Task<List<TrainingSchedule>> GetByTrainerIdAsync(Guid trainerId);
    Task<List<TrainingSchedule>> GetByMemberIdAsync(Guid memberId);
    Task<TrainingSchedule?> CreateAsync(CreateTrainingScheduleDto dto);
    Task<TrainingSchedule?> UpdateStatusAsync(Guid id, UpdateTrainingScheduleStatusDto dto);
}