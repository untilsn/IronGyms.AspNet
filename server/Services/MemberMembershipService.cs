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
            .Include(mm => mm.MembershipPlan)
            .Include(mm => mm.Member)
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
            .Include(mm => mm.MembershipPlan)
            .Include(mm => mm.Member)
            .FirstOrDefaultAsync(mm => mm.Id == id);
    }

    public async Task<MemberMembership?> CreateAsync(CreateMemberMembershipDto dto)
    {
        var member = await _context.Members.FindAsync(dto.MemberId);
        var plan = await _context.MembershipPlans.FindAsync(dto.MembershipPlanId);
        if (member is null || plan is null) return null;

        var start = dto.StartDate ?? DateTime.UtcNow;

        var membership = new MemberMembership
        {
            MemberId = dto.MemberId,
            MembershipPlanId = dto.MembershipPlanId,
            StartDate = start,
            EndDate = start.AddDays(plan.DurationInDays),
            Status = MembershipStatus.Active
        };

        _context.MemberMemberships.Add(membership);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(membership.Id);
    }

    public async Task<MemberMembership?> SubscribeAsync(Guid userId, SubscribeMembershipDto dto)
    {
        var member = await _context.Members.FirstOrDefaultAsync(m => m.UserId == userId);
        if (member is null) return null;

        var plan = await _context.MembershipPlans
            .FirstOrDefaultAsync(p => p.Id == dto.MembershipPlanId && p.IsActive);
        if (plan is null) return null;

        using var transaction = await _context.Database.BeginTransactionAsync();

        var membership = new MemberMembership
        {
            MemberId = member.Id,
            MembershipPlanId = plan.Id,
            StartDate = DateTime.UtcNow,
            EndDate = DateTime.UtcNow.AddDays(plan.DurationInDays),
            Status = MembershipStatus.Active
        };
        _context.MemberMemberships.Add(membership);
        await _context.SaveChangesAsync();

        _context.Payments.Add(new Payment
        {
            MemberMembershipId = membership.Id,
            Amount = plan.Price,
            Method = dto.PaymentMethod,
            Note = dto.Note ?? "Đăng ký gói tập mới"
        });
        await _context.SaveChangesAsync();

        await transaction.CommitAsync();

        return await GetByIdAsync(membership.Id);
    }

    public async Task<MemberMembership?> RenewAsync(Guid membershipId, RenewMembershipDto dto)
    {
        var oldMembership = await _context.MemberMemberships
            .Include(mm => mm.MembershipPlan)
            .FirstOrDefaultAsync(mm => mm.Id == membershipId);

        if (oldMembership is null) return null;
        if (oldMembership.Status == MembershipStatus.Cancelled) return null;

        using var transaction = await _context.Database.BeginTransactionAsync();

        if (oldMembership.Status == MembershipStatus.Active)
        {
            oldMembership.Status = MembershipStatus.Expired;
        }

        var start = oldMembership.EndDate > DateTime.UtcNow
            ? oldMembership.EndDate
            : DateTime.UtcNow;

        var newMembership = new MemberMembership
        {
            MemberId = oldMembership.MemberId,
            MembershipPlanId = oldMembership.MembershipPlanId,
            StartDate = start,
            EndDate = start.AddDays(oldMembership.MembershipPlan.DurationInDays),
            Status = MembershipStatus.Active
        };
        _context.MemberMemberships.Add(newMembership);
        await _context.SaveChangesAsync();

        _context.Payments.Add(new Payment
        {
            MemberMembershipId = newMembership.Id,
            Amount = oldMembership.MembershipPlan.Price,
            Method = dto.PaymentMethod,
            Note = dto.Note ?? "Gia hạn gói tập"
        });
        await _context.SaveChangesAsync();

        await transaction.CommitAsync();

        return await GetByIdAsync(newMembership.Id);
    }

    public async Task<MemberMembership?> UpdateStatusAsync(Guid id, UpdateMemberMembershipStatusDto dto)
    {
        var membership = await _context.MemberMemberships.FindAsync(id);
        if (membership is null) return null;

        membership.Status = dto.Status;
        await _context.SaveChangesAsync();

        return await GetByIdAsync(id);
    }
}