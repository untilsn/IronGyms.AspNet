using IronGyms.Api.Data;
using IronGyms.Api.DTOs.Dashboard;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;
    private readonly IMemberService _memberService;

    public DashboardService(AppDbContext context, IMemberService memberService)
    {
        _context = context;
        _memberService = memberService;
    }

    public async Task<DashboardSummaryDto?> GetMemberSummaryAsync(Guid userId)
    {
        // Dùng lại logic có sẵn ở IMemberService — không tự viết query Member mới
        var member = await _memberService.GetByUserIdAsync(userId);
        if (member is null) return null;

        var activeMembership = await _context.MemberMemberships
            .Include(mm => mm.MembershipPlan)
            .Where(mm => mm.MemberId == member.Id && mm.Status == MembershipStatus.Active)
            .OrderByDescending(mm => mm.StartDate)
            .FirstOrDefaultAsync();

        var totalCheckIns = await _context.CheckIns
            .CountAsync(c => c.MemberId == member.Id);

        var recentCheckIns = await _context.CheckIns
            .Where(c => c.MemberId == member.Id)
            .OrderByDescending(c => c.CheckInTime)
            .Take(5)
            .Select(c => new CheckInItemDto { Id = c.Id, CheckInTime = c.CheckInTime })
            .ToListAsync();

        var upcomingSchedules = await _context.TrainingSchedules
            .Include(ts => ts.Trainer).ThenInclude(t => t.User).ThenInclude(u => u.Profile)
            .Where(ts => ts.MemberId == member.Id
                      && ts.StartTime > DateTime.UtcNow
                      && ts.Status == SessionStatus.Booked)
            .OrderBy(ts => ts.StartTime)
            .Take(3)
            .Select(ts => new UpcomingScheduleDto
            {
                Id = ts.Id,
                TrainerName = ts.Trainer.User.Profile.Fullname,
                StartTime = ts.StartTime,
                EndTime = ts.EndTime,
                Status = ts.Status.ToString()
            })
            .ToListAsync();

        return new DashboardSummaryDto
        {
            ActiveMembership = activeMembership is null ? null : new ActiveMembershipDto
            {
                Id = activeMembership.Id,
                PlanName = activeMembership.MembershipPlan.Name,
                StartDate = activeMembership.StartDate,
                EndDate = activeMembership.EndDate,
                Status = activeMembership.Status.ToString()
            },
            TotalCheckIns = totalCheckIns,
            RecentCheckIns = recentCheckIns,
            UpcomingSchedules = upcomingSchedules
        };
    }
}