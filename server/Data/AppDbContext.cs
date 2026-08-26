using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<Member> Members => Set<Member>();
    public DbSet<MembershipPlan> MembershipPlans => Set<MembershipPlan>();
    public DbSet<MemberMembership> MemberMemberships => Set<MemberMembership>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<CheckIn> CheckIns => Set<CheckIn>();
    public DbSet<Trainer> Trainers => Set<Trainer>();
    public DbSet<TrainingSchedule> TrainingSchedules => Set<TrainingSchedule>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserProfile>()
            .HasOne(p => p.User)
            .WithOne(u => u.Profile)
            .HasForeignKey<UserProfile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserProfile>()
            .HasIndex(p => p.UserId)
            .IsUnique();

        builder.Entity<Member>()
            .HasIndex(m => m.UserId)
            .IsUnique();

        builder.Entity<Trainer>()
            .HasIndex(t => t.UserId)
            .IsUnique();

        // ===== User =====
        builder.Entity<User>().HasIndex(u => u.Email).IsUnique();

        // ===== Member (1-1 với User) =====
        builder.Entity<Member>()
            .HasOne(m => m.User)
            .WithOne()
            .HasForeignKey<Member>(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Member>()
            .HasIndex(m => m.UserId)
            .IsUnique();   // ép buộc thật sự 1-1, không cho 1 User có nhiều Member

        // ===== Trainer (1-1 với User) =====
        builder.Entity<Trainer>()
            .HasOne(t => t.User)
            .WithOne()
            .HasForeignKey<Trainer>(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Trainer>()
            .HasIndex(t => t.UserId)
            .IsUnique();

        // ===== MembershipPlan =====
        builder.Entity<MembershipPlan>()
            .Property(p => p.Price)
            .HasPrecision(12, 2);

        // ===== MemberMembership (N-1 với Member, N-1 với MembershipPlan) =====
        builder.Entity<MemberMembership>()
            .HasOne(mm => mm.Member)
            .WithMany()
            .HasForeignKey(mm => mm.MemberId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<MemberMembership>()
            .HasOne(mm => mm.MembershipPlan)
            .WithMany()
            .HasForeignKey(mm => mm.MembershipPlanId)
            .OnDelete(DeleteBehavior.Restrict);   // không cho xoá Plan nếu đang có người mua

        // ===== Payment (N-1 với MemberMembership) =====
        builder.Entity<Payment>()
            .HasOne(p => p.MemberMembership)
            .WithMany()
            .HasForeignKey(p => p.MemberMembershipId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Payment>()
            .Property(p => p.Amount)
            .HasPrecision(12, 2);

        // ===== CheckIn (N-1 với Member) =====
        builder.Entity<CheckIn>()
            .HasOne(c => c.Member)
            .WithMany()
            .HasForeignKey(c => c.MemberId)
            .OnDelete(DeleteBehavior.Cascade);

        // ===== TrainingSchedule (N-1 với Trainer, N-1 với Member) =====
        builder.Entity<TrainingSchedule>()
            .HasOne(ts => ts.Trainer)
            .WithMany()
            .HasForeignKey(ts => ts.TrainerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<TrainingSchedule>()
            .HasOne(ts => ts.Member)
            .WithMany()
            .HasForeignKey(ts => ts.MemberId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}