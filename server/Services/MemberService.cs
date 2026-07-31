using IronGyms.Api.Data;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class MemberService : IMemberService
{
    private readonly AppDbContext _context;

    public MemberService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Member>> GetAllAsync()
    {
        return await _context.Members.ToListAsync();
    }

    public async Task<Member?> GetByIdAsync(Guid id)
    {
        return await _context.Members.FindAsync(id);
    }

    public async Task<Member> CreateAsync(Member member)
    {
        _context.Members.Add(member);
        await _context.SaveChangesAsync();
        return member;
    }

    public async Task<Member?> UpdateAsync(Guid id, Member updated)
    {
        var member = await _context.Members.FindAsync(id);
        if (member is null) return null;

        member.Fullname = updated.Fullname;
        member.Email = updated.Email;
        await _context.SaveChangesAsync();
        return member;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var member = await _context.Members.FindAsync(id);
        if (member is null) return false;

        _context.Members.Remove(member);
        await _context.SaveChangesAsync();
        return true;
    }
}