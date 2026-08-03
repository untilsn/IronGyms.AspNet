using IronGyms.Api.Data;
using IronGyms.Api.DTOs.CheckIns;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class CheckInService : ICheckInService
{
    private readonly AppDbContext _context;

    public CheckInService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CheckIn>> GetByMemberIdAsync(Guid memberId)
    {
        return await _context.CheckIns
            .Where(c => c.MemberId == memberId)
            .OrderByDescending(c => c.CheckInTime)
            .ToListAsync();
    }

    public async Task<CheckIn?> CreateAsync(CreateCheckInDto dto)
    {
        var memberExists = await _context.Members.AnyAsync(m => m.Id == dto.MemberId);
        if (!memberExists) return null;

        var checkIn = new CheckIn
        {
            MemberId = dto.MemberId,
            CheckInTime = DateTime.UtcNow
        };

        _context.CheckIns.Add(checkIn);
        await _context.SaveChangesAsync();
        return checkIn;
    }
}