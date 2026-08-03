using IronGyms.Api.Data;
using IronGyms.Api.DTOs.TrainingSchedules;
using IronGyms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class TrainingScheduleService : ITrainingScheduleService
{
    private readonly AppDbContext _context;

    public TrainingScheduleService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TrainingSchedule>> GetAllAsync()
    {
        return await _context.TrainingSchedules
            .Include(ts => ts.Trainer).ThenInclude(t => t.User)
            .Include(ts => ts.Member).ThenInclude(m => m.User)
            .OrderBy(ts => ts.StartTime)
            .ToListAsync();
    }

    public async Task<List<TrainingSchedule>> GetByTrainerIdAsync(Guid trainerId)
    {
        return await _context.TrainingSchedules
            .Include(ts => ts.Member).ThenInclude(m => m.User)
            .Where(ts => ts.TrainerId == trainerId)
            .OrderBy(ts => ts.StartTime)
            .ToListAsync();
    }

    public async Task<List<TrainingSchedule>> GetByMemberIdAsync(Guid memberId)
    {
        return await _context.TrainingSchedules
            .Include(ts => ts.Trainer).ThenInclude(t => t.User)
            .Where(ts => ts.MemberId == memberId)
            .OrderBy(ts => ts.StartTime)
            .ToListAsync();
    }

    public async Task<TrainingSchedule?> CreateAsync(CreateTrainingScheduleDto dto)
    {
        var trainerExists = await _context.Trainers.AnyAsync(t => t.Id == dto.TrainerId);
        var memberExists = await _context.Members.AnyAsync(m => m.Id == dto.MemberId);
        if (!trainerExists || !memberExists) return null;

        if (dto.EndTime <= dto.StartTime) return null;

        // Kiểm tra Trainer có bị trùng lịch không (đã có lịch Booked nào giao với khoảng thời gian mới)
        var isOverlapping = await _context.TrainingSchedules.AnyAsync(ts =>
            ts.TrainerId == dto.TrainerId &&
            ts.Status == SessionStatus.Booked &&
            dto.StartTime < ts.EndTime && dto.EndTime > ts.StartTime);

        if (isOverlapping) return null;

        var schedule = new TrainingSchedule
        {
            TrainerId = dto.TrainerId,
            MemberId = dto.MemberId,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            Status = SessionStatus.Booked
        };

        _context.TrainingSchedules.Add(schedule);
        await _context.SaveChangesAsync();
        return schedule;
    }

    public async Task<TrainingSchedule?> UpdateStatusAsync(Guid id, UpdateTrainingScheduleStatusDto dto)
    {
        var schedule = await _context.TrainingSchedules.FindAsync(id);
        if (schedule is null) return null;

        schedule.Status = dto.Status;
        await _context.SaveChangesAsync();
        return schedule;
    }
}