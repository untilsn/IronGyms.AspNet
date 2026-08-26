using IronGyms.Api.Data;
using IronGyms.Api.DTOs;
using IronGyms.Api.DTOs.Members;
using IronGyms.Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class MemberService : IMemberService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public MemberService(
        AppDbContext context,
        IWebHostEnvironment environment,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _environment = environment;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<List<MemberDto>> GetAllAsync()
    {
        return await _context.Members
            .Include(m => m.User).ThenInclude(u => u.Profile)
            .Select(m => ToDto(m))
            .ToListAsync();
    }

    public async Task<MemberDto?> GetByIdAsync(Guid id)
    {
        var member = await _context.Members
            .Include(m => m.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(m => m.Id == id);

        return member is null ? null : ToDto(member);
    }

    public async Task<MemberDto?> GetByUserIdDtoAsync(Guid userId)
    {
        var member = await GetByUserIdAsync(userId);
        return member is null ? null : ToDto(member);
    }

    public async Task<Member?> GetByUserIdAsync(Guid userId)
    {
        return await _context.Members
            .Include(m => m.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(m => m.UserId == userId);
    }

    public async Task<MemberDto?> UpdateAsync(Guid id, UpdateMemberDto dto)
    {
        var member = await _context.Members
            .Include(m => m.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(m => m.Id == id);
        if (member is null) return null;

        member.User.Profile.DateOfBirth = dto.DateOfBirth;
        member.User.Profile.Gender = dto.Gender;
        member.User.Profile.City = dto.City;
        member.User.Profile.Address = dto.Address;

        await _context.SaveChangesAsync();
        return ToDto(member);
    }

    public async Task<MemberDto?> UploadAvatarAsync(Guid id, IFormFile file)
    {
        var member = await _context.Members
            .Include(m => m.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(m => m.Id == id);
        if (member is null) return null;

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{member.UserId}{extension}";
        var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "avatars");
        Directory.CreateDirectory(uploadsFolder);

        var filePath = Path.Combine(uploadsFolder, fileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var request = _httpContextAccessor.HttpContext!.Request;
        var baseUrl = $"{request.Scheme}://{request.Host}";
        member.User.Profile.AvatarUrl = $"{baseUrl}/uploads/avatars/{fileName}";

        await _context.SaveChangesAsync();
        return ToDto(member);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var member = await _context.Members.FindAsync(id);
        if (member is null) return false;

        _context.Members.Remove(member);
        await _context.SaveChangesAsync();
        return true;
    }

    private static MemberDto ToDto(Member member) => new()
    {
        Id = member.Id,
        Fullname = member.User.Profile.Fullname,
        Email = member.User.Email,
        AvatarUrl = member.User.Profile.AvatarUrl,
        DateOfBirth = member.User.Profile.DateOfBirth,
        Gender = member.User.Profile.Gender,
        City = member.User.Profile.City,
        Address = member.User.Profile.Address,
        JoinedAt = member.JoinedAt
    };
}