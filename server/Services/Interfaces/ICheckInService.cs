using IronGyms.Api.DTOs.CheckIns;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface ICheckInService
{
    Task<List<CheckIn>> GetByMemberIdAsync(Guid memberId);
    Task<CheckIn?> CreateAsync(CreateCheckInDto dto);
}