using IronGyms.Api.DTOs.Payments;
using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface IPaymentService
{
    Task<List<Payment>> GetAllAsync();
    Task<List<Payment>> GetByMemberMembershipIdAsync(Guid memberMembershipId);
    Task<Payment?> GetByIdAsync(Guid id);
    Task<Payment?> CreateAsync(CreatePaymentDto dto);
}