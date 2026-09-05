namespace IronGyms.Api.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public ActiveMembershipDto? ActiveMembership { get; set; }
    public int TotalCheckIns { get; set; }
    public List<CheckInItemDto> RecentCheckIns { get; set; } = [];
    public List<UpcomingScheduleDto> UpcomingSchedules { get; set; } = [];
}

public class ActiveMembershipDto
{
    public Guid Id { get; set; }
    public string PlanName { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class CheckInItemDto
{
    public Guid Id { get; set; }
    public DateTime CheckInTime { get; set; }
}

public class UpcomingScheduleDto
{
    public Guid Id { get; set; }
    public string TrainerName { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; } = string.Empty;
}


public class DashboardStatsDto
{
    public int TotalMembers { get; set; }
    public int CheckInsToday { get; set; }
    public decimal RevenueThisMonth { get; set; }
    public int NewRegistrations { get; set; }
}

public class RevenueChartDto
{
    public List<string> Labels { get; set; } = [];
    public List<decimal> Values { get; set; } = [];
}

public class CheckInsChartDto
{
    public List<string> Labels { get; set; } = [];
    public List<int> Values { get; set; } = [];
}

public class PlanDistributionDto
{
    public string PlanName { get; set; } = "";
    public int Count { get; set; }
}

public class ExpiringMembershipDto
{
    public string MemberName { get; set; } = "";
    public string PlanName { get; set; } = "";
    public DateTime EndDate { get; set; }
}