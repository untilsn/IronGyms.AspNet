using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        // ===== 1. Users theo 4 role, dùng đúng account test bạn yêu cầu =====
        var admin = await EnsureUserAsync(context, "Admin", "admin@test.com", "12345678", UserRole.Admin);
        var staff = await EnsureUserAsync(context, "Staff", "staff@test.com", "12345678", UserRole.Staff);
        var trainerUser = await EnsureUserAsync(context, "Trainer", "trainer@test.com", "12345678", UserRole.Trainer);
        var memberUser = await EnsureUserAsync(context, "Member", "member@test.com", "12345678", UserRole.Member);

        // Set thêm thông tin profile cho từng role cho có dữ liệu để hiển thị UI
        await UpdateProfileAsync(context, admin.Id, city: "TP.HCM", address: "1 Đường Admin, Quận 1, TP.HCM", gender: "Nam", dob: new DateTime(1990, 1, 15, 0, 0, 0, DateTimeKind.Utc));
        await UpdateProfileAsync(context, staff.Id, city: "TP.HCM", address: "2 Đường Staff, Quận 3, TP.HCM", gender: "Nữ", dob: new DateTime(1996, 4, 22, 0, 0, 0, DateTimeKind.Utc));
        await UpdateProfileAsync(context, trainerUser.Id, city: "TP.HCM", address: "3 Đường Trainer, Quận 5, TP.HCM", gender: "Nam", dob: new DateTime(1993, 8, 3, 0, 0, 0, DateTimeKind.Utc));
        await UpdateProfileAsync(context, memberUser.Id, city: "TP.HCM", address: "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM", gender: "Nam", dob: new DateTime(1998, 5, 20, 0, 0, 0, DateTimeKind.Utc));

        // ===== 2. Trainer profile cho account Trainer =====
        var trainer = await EnsureTrainerAsync(
            context,
            trainerUser,
            specialty: "Huấn luyện sức mạnh & Cardio",
            bio: "5 năm kinh nghiệm huấn luyện cá nhân, chuyên về tăng cơ giảm mỡ và phục hồi chấn thương nhẹ.",
            experienceYears: 5,
            certifications: "ACE Certified Personal Trainer, First Aid & CPR");

        // ===== 3. Member profile cho account Member =====
        var member = await EnsureMemberAsync(context, memberUser);

        // ===== 4. Gói tập mẫu =====
        var planBasic = await EnsurePlanAsync(context, "Gói 1 Tháng", "Tập không giới hạn trong 1 tháng", 500_000m, 30);
        var planQuarter = await EnsurePlanAsync(context, "Gói 3 Tháng", "Tiết kiệm hơn cho cam kết dài hạn", 1_350_000m, 90);
        var planYear = await EnsurePlanAsync(context, "Gói 12 Tháng", "Ưu đãi tốt nhất cho hội viên gắn bó lâu dài", 4_800_000m, 365);

        await context.SaveChangesAsync();

        // ===== 5. Membership + Payment cho Member test =====
        var membership = await EnsureMembershipAsync(context, member, planQuarter);
        await EnsurePaymentAsync(context, membership, membership.MembershipPlan?.Price ?? planQuarter.Price);

        // ===== 6. Check-in mẫu (vài lần gần đây để test lịch sử) =====
        await EnsureCheckInsAsync(context, member);

        // ===== 7. Lịch tập với Trainer (1 buổi sắp tới, 1 buổi đã hoàn thành) =====
        await EnsureSchedulesAsync(context, trainer, member);

        await context.SaveChangesAsync();
    }

    // ---------- Users & Profile ----------

    private static async Task<User> EnsureUserAsync(
        AppDbContext context, string fullname, string email, string password, UserRole role)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is not null) return user;

        user = new User
        {
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            Role = role,
            IsActive = true
        };
        context.Users.Add(user);

        var profile = new UserProfile
        {
            UserId = user.Id,
            User = user,
            Fullname = fullname
        };
        context.UserProfiles.Add(profile);
        user.Profile = profile;

        await context.SaveChangesAsync();
        return user;
    }

    private static async Task UpdateProfileAsync(
        AppDbContext context, Guid userId, string city, string address, string gender, DateTime dob)
    {
        var profile = await context.UserProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile is null) return;

        profile.City = city;
        profile.Address = address;
        profile.Gender = gender;
        profile.DateOfBirth = dob;

        await context.SaveChangesAsync();
    }

    // ---------- Trainer ----------

    private static async Task<Trainer> EnsureTrainerAsync(
        AppDbContext context, User user, string specialty, string bio, int experienceYears, string certifications)
    {
        var trainer = await context.Trainers.FirstOrDefaultAsync(t => t.UserId == user.Id);
        if (trainer is not null) return trainer;

        trainer = new Trainer
        {
            UserId = user.Id,
            User = user,
            Specialty = specialty,
            Bio = bio,
            ExperienceYears = experienceYears,
            Certifications = certifications
        };

        context.Trainers.Add(trainer);
        await context.SaveChangesAsync();
        return trainer;
    }

    // ---------- Member ----------

    private static async Task<Member> EnsureMemberAsync(AppDbContext context, User user)
    {
        var member = await context.Members.FirstOrDefaultAsync(m => m.UserId == user.Id);
        if (member is not null) return member;

        member = new Member { UserId = user.Id, User = user };
        context.Members.Add(member);
        await context.SaveChangesAsync();
        return member;
    }

    // ---------- MembershipPlan ----------

    private static async Task<MembershipPlan> EnsurePlanAsync(
        AppDbContext context, string name, string description, decimal price, int durationInDays)
    {
        var plan = await context.MembershipPlans.FirstOrDefaultAsync(p => p.Name == name);
        if (plan is not null) return plan;

        plan = new MembershipPlan
        {
            Name = name,
            Description = description,
            Price = price,
            DurationInDays = durationInDays,
            IsActive = true
        };

        context.MembershipPlans.Add(plan);
        return plan;
    }

    // ---------- MemberMembership ----------

    private static async Task<MemberMembership> EnsureMembershipAsync(
        AppDbContext context, Member member, MembershipPlan plan)
    {
        var existing = await context.MemberMemberships
            .Include(mm => mm.MembershipPlan)
            .FirstOrDefaultAsync(mm => mm.MemberId == member.Id && mm.Status == MembershipStatus.Active);
        if (existing is not null) return existing;

        var start = DateTime.UtcNow.AddDays(-10);
        var membership = new MemberMembership
        {
            MemberId = member.Id,
            MembershipPlanId = plan.Id,
            MembershipPlan = plan,
            StartDate = start,
            EndDate = start.AddDays(plan.DurationInDays),
            Status = MembershipStatus.Active
        };

        context.MemberMemberships.Add(membership);
        await context.SaveChangesAsync();
        return membership;
    }

    // ---------- Payment ----------

    private static async Task EnsurePaymentAsync(AppDbContext context, MemberMembership membership, decimal amount)
    {
        var exists = await context.Payments.AnyAsync(p => p.MemberMembershipId == membership.Id);
        if (exists) return;

        context.Payments.Add(new Payment
        {
            MemberMembershipId = membership.Id,
            Amount = amount,
            Method = PaymentMethod.BankTransfer,
            Note = "Thanh toán gói tập (dữ liệu mẫu)"
        });
    }

    // ---------- CheckIn ----------

    private static async Task EnsureCheckInsAsync(AppDbContext context, Member member)
    {
        var exists = await context.CheckIns.AnyAsync(c => c.MemberId == member.Id);
        if (exists) return;

        context.CheckIns.AddRange(
            new CheckIn { MemberId = member.Id, CheckInTime = DateTime.UtcNow.AddDays(-6).AddHours(8) },
            new CheckIn { MemberId = member.Id, CheckInTime = DateTime.UtcNow.AddDays(-4).AddHours(18) },
            new CheckIn { MemberId = member.Id, CheckInTime = DateTime.UtcNow.AddDays(-2).AddHours(7) },
            new CheckIn { MemberId = member.Id, CheckInTime = DateTime.UtcNow.AddDays(-1).AddHours(19) }
        );
    }

    // ---------- TrainingSchedule ----------

    private static async Task EnsureSchedulesAsync(AppDbContext context, Trainer trainer, Member member)
    {
        var exists = await context.TrainingSchedules
            .AnyAsync(ts => ts.TrainerId == trainer.Id && ts.MemberId == member.Id);
        if (exists) return;

        // Buổi tập đã hoàn thành (2 ngày trước)
        var pastStart = DateTime.UtcNow.AddDays(-2).Date.AddHours(18);
        context.TrainingSchedules.Add(new TrainingSchedule
        {
            TrainerId = trainer.Id,
            MemberId = member.Id,
            StartTime = pastStart,
            EndTime = pastStart.AddHours(1),
            Status = SessionStatus.Completed
        });

        // Buổi tập sắp tới (2 ngày sau)
        var futureStart = DateTime.UtcNow.AddDays(2).Date.AddHours(18);
        context.TrainingSchedules.Add(new TrainingSchedule
        {
            TrainerId = trainer.Id,
            MemberId = member.Id,
            StartTime = futureStart,
            EndTime = futureStart.AddHours(1),
            Status = SessionStatus.Booked
        });
    }
}