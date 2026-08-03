using IronGyms.Api.Data;
using IronGyms.Api.DTOs.MemberMemberships;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class MemberMembershipService : IMemberMembershipService
{
    private readonly AppDbContext _context;

    public MemberMembershipService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MemberMembership>> GetAllAsync()
    {
        return await _context.MemberMemberships
            .Include(mm => mm.Member).ThenInclude(m => m.User)
            .Include(mm => mm.MembershipPlan)
            .OrderByDescending(mm => mm.StartDate)
            .ToListAsync();
    }

    public async Task<List<MemberMembership>> GetByMemberIdAsync(Guid memberId)
    {
        return await _context.MemberMemberships
            .Include(mm => mm.MembershipPlan)
            .Where(mm => mm.MemberId == memberId)
            .OrderByDescending(mm => mm.StartDate)
            .ToListAsync();
    }

    public async Task<MemberMembership?> GetByIdAsync(Guid id)
    {
        return await _context.MemberMemberships
            .Include(mm => mm.Member).ThenInclude(m => m.User)
            .Include(mm => mm.MembershipPlan)
            .FirstOrDefaultAsync(mm => mm.Id == id);
    }

    public async Task<MemberMembership?> CreateAsync(CreateMemberMembershipDto dto)
    {
        var memberExists = await _context.Members.AnyAsync(m => m.Id == dto.MemberId);
        if (!memberExists) return null;

        var plan = await _context.MembershipPlans.FindAsync(dto.MembershipPlanId);
        if (plan is null || !plan.IsActive) return null;

        var startDate = dto.StartDate ?? DateTime.UtcNow;

        var membership = new MemberMembership
        {
            MemberId = dto.MemberId,
            MembershipPlanId = dto.MembershipPlanId,
            StartDate = startDate,
            EndDate = startDate.AddDays(plan.DurationInDays),
            Status = MembershipStatus.Active
        };

        _context.MemberMemberships.Add(membership);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(membership.Id);
    }

    public async Task<MemberMembership?> UpdateStatusAsync(Guid id, UpdateMemberMembershipStatusDto dto)
    {
        var membership = await _context.MemberMemberships.FindAsync(id);
        if (membership is null) return null;

        membership.Status = dto.Status;
        await _context.SaveChangesAsync();
        return membership;
    }
}