using Microsoft.AspNetCore.Http;

namespace IronGyms.Api.Services;

public interface IUserProfileService
{
    Task<string?> UploadAvatarAsync(Guid userId, IFormFile file);
}