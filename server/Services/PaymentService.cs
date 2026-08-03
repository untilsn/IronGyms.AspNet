using IronGyms.Api.Data;
using IronGyms.Api.DTOs.Payments;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class PaymentService : IPaymentService
{
    private readonly AppDbContext _context;

    public PaymentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Payment>> GetAllAsync()
    {
        return await _context.Payments
            .Include(p => p.MemberMembership).ThenInclude(mm => mm.Member).ThenInclude(m => m.User)
            .Include(p => p.MemberMembership).ThenInclude(mm => mm.MembershipPlan)
            .OrderByDescending(p => p.PaidAt)
            .ToListAsync();
    }

    public async Task<List<Payment>> GetByMemberMembershipIdAsync(Guid memberMembershipId)
    {
        return await _context.Payments
            .Where(p => p.MemberMembershipId == memberMembershipId)
            .OrderByDescending(p => p.PaidAt)
            .ToListAsync();
    }

    public async Task<Payment?> GetByIdAsync(Guid id)
    {
        return await _context.Payments
            .Include(p => p.MemberMembership).ThenInclude(mm => mm.Member).ThenInclude(m => m.User)
            .Include(p => p.MemberMembership).ThenInclude(mm => mm.MembershipPlan)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Payment?> CreateAsync(CreatePaymentDto dto)
    {
        var membershipExists = await _context.MemberMemberships.AnyAsync(mm => mm.Id == dto.MemberMembershipId);
        if (!membershipExists) return null;

        var payment = new Payment
        {
            MemberMembershipId = dto.MemberMembershipId,
            Amount = dto.Amount,
            Method = dto.Method,
            Note = dto.Note,
            PaidAt = DateTime.UtcNow
        };

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(payment.Id);
    }
}