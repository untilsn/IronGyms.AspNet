using IronGyms.Api.Data;
using IronGyms.Api.DTOs;
using IronGyms.Api.DTOs.Trainers;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class TrainerService : ITrainerService
{
    private readonly AppDbContext _context;

    public TrainerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TrainerDto>> GetAllAsync()
    {
        return await _context.Trainers
            .Include(t => t.User).ThenInclude(u => u.Profile)
            .Select(t => ToDto(t))
            .ToListAsync();
    }

    public async Task<TrainerDto?> GetByIdAsync(Guid id)
    {
        var trainer = await _context.Trainers
            .Include(t => t.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(t => t.Id == id);

        return trainer is null ? null : ToDto(trainer);
    }

    public async Task<TrainerDto?> CreateAsync(CreateTrainerDto dto)
    {
        var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (emailExists) return null;

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.Trainer
        };
        _context.Users.Add(user);

        var profile = new UserProfile
        {
            UserId = user.Id,
            User = user,
            Fullname = dto.Fullname
        };
        _context.UserProfiles.Add(profile);
        user.Profile = profile;

        var trainer = new Trainer
        {
            UserId = user.Id,
            User = user,
            Specialty = dto.Specialty,
            Bio = dto.Bio,
            ExperienceYears = dto.ExperienceYears,
            Certifications = dto.Certifications
        };
        _context.Trainers.Add(trainer);

        await _context.SaveChangesAsync();
        return ToDto(trainer);
    }

    public async Task<TrainerDto?> UpdateAsync(Guid id, UpdateTrainerDto dto)
    {
        var trainer = await _context.Trainers
            .Include(t => t.User).ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(t => t.Id == id);
        if (trainer is null) return null;

        trainer.Specialty = dto.Specialty;
        trainer.Bio = dto.Bio;
        trainer.ExperienceYears = dto.ExperienceYears;
        trainer.Certifications = dto.Certifications;

        await _context.SaveChangesAsync();
        return ToDto(trainer);
    }

    private static TrainerDto ToDto(Trainer trainer) => new()
    {
        Id = trainer.Id,
        Fullname = trainer.User.Profile.Fullname,
        Email = trainer.User.Email,
        AvatarUrl = trainer.User.Profile.AvatarUrl,
        Specialty = trainer.Specialty,
        Bio = trainer.Bio,
        ExperienceYears = trainer.ExperienceYears,
        Certifications = trainer.Certifications,
        JoinedAt = trainer.JoinedAt
    };
}