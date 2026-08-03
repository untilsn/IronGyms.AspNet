using IronGyms.Api.DTOs.Trainers;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface ITrainerService
{
    Task<List<Trainer>> GetAllAsync();
    Task<Trainer?> GetByIdAsync(Guid id);
    Task<Trainer?> CreateAsync(CreateTrainerDto dto);
    Task<Trainer?> UpdateAsync(Guid id, UpdateTrainerDto dto);
}