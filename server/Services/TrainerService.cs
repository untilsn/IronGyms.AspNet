using IronGyms.Api.Data;
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

    public async Task<List<Trainer>> GetAllAsync()
    {
        return await _context.Trainers.Include(t => t.User).ToListAsync();
    }

    public async Task<Trainer?> GetByIdAsync(Guid id)
    {
        return await _context.Trainers.Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Trainer?> CreateAsync(CreateTrainerDto dto)
    {
        var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (emailExists) return null;

        var user = new User
        {
            Fullname = dto.Fullname,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.Trainer
        };
        _context.Users.Add(user);

        var trainer = new Trainer
        {
            UserId = user.Id,
            User = user,
            Specialty = dto.Specialty
        };
        _context.Trainers.Add(trainer);

        await _context.SaveChangesAsync();
        return await GetByIdAsync(trainer.Id);
    }

    public async Task<Trainer?> UpdateAsync(Guid id, UpdateTrainerDto dto)
    {
        var trainer = await _context.Trainers.FindAsync(id);
        if (trainer is null) return null;

        trainer.Specialty = dto.Specialty;
        await _context.SaveChangesAsync();
        return trainer;
    }
}