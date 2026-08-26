using IronGyms.Api.DTOs;
using IronGyms.Api.DTOs.Members;
using IronGyms.Api.Models;
using Microsoft.AspNetCore.Http;

namespace IronGyms.Api.Services;

public interface IMemberService
{
    Task<List<MemberDto>> GetAllAsync();
    Task<MemberDto?> GetByIdAsync(Guid id);
    Task<MemberDto?> GetByUserIdDtoAsync(Guid userId);
    Task<Member?> GetByUserIdAsync(Guid userId);
    Task<MemberDto?> UpdateAsync(Guid id, UpdateMemberDto dto);
    Task<MemberDto?> UploadAvatarAsync(Guid id, IFormFile file);
    Task<bool> DeleteAsync(Guid id);
}