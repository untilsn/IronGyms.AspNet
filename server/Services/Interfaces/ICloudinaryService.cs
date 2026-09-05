using Microsoft.AspNetCore.Http;

namespace IronGyms.Api.Services;

public interface ICloudinaryService
{
    Task<string?> UploadAvatarAsync(IFormFile file, Guid userId);
}