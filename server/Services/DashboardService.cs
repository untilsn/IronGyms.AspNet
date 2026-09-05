using IronGyms.Api.Data;
using IronGyms.Api.DTOs.Dashboard;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class DashboardService :
    IMemberDashboardService,
    IAdminDashboardService
{
    private readonly AppDbContext _context;
    private readonly IMemberService _memberService;

    public DashboardService(
        AppDbContext context,
        IMemberService memberService)
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

    public async Task<DashboardStatsDto> GetOverviewStatsAsync()
    {
        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var today = now.Date;

        var totalMembers = await _context.Members.CountAsync();

        var checkInsToday = await _context.CheckIns
            .CountAsync(c => c.CheckInTime >= today && c.CheckInTime < today.AddDays(1));

        var revenueThisMonth = await _context.Payments
            .Where(p => p.PaidAt >= startOfMonth)
            .SumAsync(p => (decimal?)p.Amount) ?? 0;

        var newRegistrationsThisMonth = await _context.MemberMemberships
            .CountAsync(mm => mm.StartDate >= startOfMonth);

        return new DashboardStatsDto
        {
            TotalMembers = totalMembers,
            CheckInsToday = checkInsToday,
            RevenueThisMonth = revenueThisMonth,
            NewRegistrations = newRegistrationsThisMonth
        };
    }

    public async Task<RevenueChartDto> GetRevenueTrendAsync(int months)
    {
        var start = DateTime.UtcNow.AddMonths(-months + 1);
        start = new DateTime(start.Year, start.Month, 1, 0, 0, 0, DateTimeKind.Utc);

        var grouped = await _context.Payments
            .Where(p => p.PaidAt >= start)
            .GroupBy(p => new { p.PaidAt.Year, p.PaidAt.Month })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Total = g.Sum(p => p.Amount)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToListAsync();

        return new RevenueChartDto
        {
            Labels = grouped.Select(x => $"Th{x.Month}/{x.Year}").ToList(),
            Values = grouped.Select(x => x.Total).ToList()
        };
    }

    public async Task<CheckInsChartDto> GetCheckInsTrendAsync(int days)
    {
        var start = DateTime.UtcNow.Date.AddDays(-days + 1);

        var grouped = await _context.CheckIns
            .Where(c => c.CheckInTime >= start)
            .GroupBy(c => c.CheckInTime.Date)
            .Select(g => new { Date = g.Key, Count = g.Count() })
            .ToListAsync(); // group theo ngày UTC; convert timezone ở tầng đọc nếu cần hiển thị giờ VN

        // Đảm bảo đủ 7 ngày kể cả ngày 0 check-in, không để FE tự đoán ngày thiếu
        var labels = new List<string>();
        var values = new List<int>();
        for (var d = start; d <= DateTime.UtcNow.Date; d = d.AddDays(1))
        {
            labels.Add(d.ToString("dd/MM"));
            values.Add(grouped.FirstOrDefault(x => x.Date == d)?.Count ?? 0);
        }

        return new CheckInsChartDto { Labels = labels, Values = values };
    }

    public async Task<List<PlanDistributionDto>> GetPlanDistributionAsync()
    {
        return await _context.MemberMemberships
            .Where(mm => mm.Status == MembershipStatus.Active)
            .GroupBy(mm => mm.MembershipPlan.Name)
            .Select(g => new PlanDistributionDto
            {
                PlanName = g.Key,
                Count = g.Count()
            })
            .ToListAsync();
    }

    public async Task<List<ExpiringMembershipDto>> GetExpiringMembershipsAsync(int withinDays)
    {
        var threshold = DateTime.UtcNow.AddDays(withinDays);

        return await _context.MemberMemberships
            .Include(mm => mm.Member).ThenInclude(m => m.User).ThenInclude(u => u.Profile)
            .Include(mm => mm.MembershipPlan)
            .Where(mm => mm.Status == MembershipStatus.Active && mm.EndDate <= threshold)
            .OrderBy(mm => mm.EndDate)
            .Take(10)
            .Select(mm => new ExpiringMembershipDto
            {
                MemberName = mm.Member.User.Profile.Fullname,
                PlanName = mm.MembershipPlan.Name,
                EndDate = mm.EndDate
            })
            .ToListAsync();
    }
}