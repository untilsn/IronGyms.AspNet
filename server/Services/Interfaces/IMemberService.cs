using IronGyms.Api.Models;

namespace IronGyms.Api.Services;

public interface IMemberService
{
    Task<List<Member>> GetAllAsync();
    Task<Member?> GetByIdAsync(Guid id);
    Task<Member> CreateAsync(Member member);
    Task<Member?> UpdateAsync(Guid id, Member updated);
    Task<bool> DeleteAsync(Guid id);
}