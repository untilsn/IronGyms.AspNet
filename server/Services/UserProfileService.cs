using IronGyms.Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IronGyms.Api.Services;

public class UserProfileService : IUserProfileService
{
    private readonly AppDbContext _context;
    private readonly ICloudinaryService _cloudinaryService;

    public UserProfileService(AppDbContext context, ICloudinaryService cloudinaryService)
    {
        _context = context;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<string?> UploadAvatarAsync(Guid userId, IFormFile file)
    {
        // UserProfile là bảng chung cho cả 4 role — không cần biết
        // userId này là Member, Trainer, Admin hay Staff
        var profile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (profile is null) return null;

        var avatarUrl = await _cloudinaryService.UploadAvatarAsync(file, userId);
        if (avatarUrl is null) return null;

        profile.AvatarUrl = avatarUrl;
        await _context.SaveChangesAsync();

        return avatarUrl;
    }
}