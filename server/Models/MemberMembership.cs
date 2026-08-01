namespace IronGyms.Api.Models;

public enum MembershipStatus { Active, Expired, Paused, Cancelled }

public class MemberMembership
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public Guid MembershipPlanId { get; set; }
    public MembershipPlan MembershipPlan { get; set; } = null!;

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public MembershipStatus Status { get; set; } = MembershipStatus.Active;
}