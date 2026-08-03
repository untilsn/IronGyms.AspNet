using IronGyms.Api.Data;
using IronGyms.Api.DTOs.MembershipPlans;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class MembershipPlanService : IMembershipPlanService
{
    private readonly AppDbContext _context;

    public MembershipPlanService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MembershipPlan>> GetAllAsync()
    {
        return await _context.MembershipPlans
            .OrderBy(p => p.Price)
            .ToListAsync();
    }

    public async Task<MembershipPlan?> GetByIdAsync(Guid id)
    {
        return await _context.MembershipPlans.FindAsync(id);
    }

    public async Task<MembershipPlan> CreateAsync(CreateMembershipPlanDto dto)
    {
        var plan = new MembershipPlan
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            DurationInDays = dto.DurationInDays
        };

        _context.MembershipPlans.Add(plan);
        await _context.SaveChangesAsync();
        return plan;
    }

    public async Task<MembershipPlan?> UpdateAsync(Guid id, UpdateMembershipPlanDto dto)
    {
        var plan = await _context.MembershipPlans.FindAsync(id);
        if (plan is null) return null;

        plan.Name = dto.Name;
        plan.Description = dto.Description;
        plan.Price = dto.Price;
        plan.DurationInDays = dto.DurationInDays;
        plan.IsActive = dto.IsActive;

        await _context.SaveChangesAsync();
        return plan;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var plan = await _context.MembershipPlans.FindAsync(id);
        if (plan is null) return false;

        _context.MembershipPlans.Remove(plan);
        await _context.SaveChangesAsync();
        return true;
    }
}