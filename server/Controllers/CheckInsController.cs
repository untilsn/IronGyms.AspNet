using IronGyms.Api.DTOs.CheckIns;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CheckInsController : ControllerBase
{
    private readonly ICheckInService _checkInService;

    public CheckInsController(ICheckInService checkInService)
    {
        _checkInService = checkInService;
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpGet("member/{memberId}")]
    public async Task<IActionResult> GetByMember(Guid memberId)
    {
        var checkIns = await _checkInService.GetByMemberIdAsync(memberId);
        return Ok(checkIns);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCheckInDto dto)
    {
        var checkIn = await _checkInService.CreateAsync(dto);
        if (checkIn is null)
            return BadRequest(new { message = "Member không tồn tại" });

        return Ok(checkIn);
    }
}