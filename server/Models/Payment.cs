namespace IronGyms.Api.Models;

public enum PaymentMethod { Cash, BankTransfer, Card }

public class Payment
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid MemberMembershipId { get; set; }
    public MemberMembership MemberMembership { get; set; } = null!;

    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
    public DateTime PaidAt { get; set; } = DateTime.UtcNow;
    public string? Note { get; set; }
}