using IronGyms.Api.DTOs;
using IronGyms.Api.DTOs.Trainers;

namespace IronGyms.Api.Services;

public interface ITrainerService
{
    Task<List<TrainerDto>> GetAllAsync();
    Task<TrainerDto?> GetByIdAsync(Guid id);
    Task<TrainerDto?> CreateAsync(CreateTrainerDto dto);
    Task<TrainerDto?> UpdateAsync(Guid id, UpdateTrainerDto dto);
}