using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace IronGyms.Api.Services;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<string?> UploadAvatarAsync(IFormFile file, Guid userId)
    {
        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "irongyms/avatars",
            // PublicId = userId → mỗi lần đổi ảnh sẽ GHI ĐÈ đúng ảnh cũ của
            // user đó, không tạo file rác mới trên Cloudinary mỗi lần upload
            PublicId = userId.ToString(),
            Overwrite = true,
            Transformation = new Transformation()
                .Width(400).Height(400).Crop("fill").Gravity("face")
        };

        var result = await _cloudinary.UploadAsync(uploadParams);
        if (result.StatusCode != System.Net.HttpStatusCode.OK) return null;

        return result.SecureUrl?.ToString();
    }
}