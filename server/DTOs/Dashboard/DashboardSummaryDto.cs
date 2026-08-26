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