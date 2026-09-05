using IronGyms.Api.DTOs.MemberMemberships;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MemberMembershipsController : ControllerBase
{
    private readonly IMemberMembershipService _service;

    public MemberMembershipsController(IMemberMembershipService service)
    {
        _service = service;
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [Authorize(Roles = "Member,Admin,Staff")]
    [HttpGet("member/{memberId}")]
    public async Task<IActionResult> GetByMember(Guid memberId)
    {
        var result = await _service.GetByMemberIdAsync(memberId);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result is null) return NotFound();
        return Ok(result);
    }

    // Admin tạo hộ gói tập cho 1 Member bất kỳ
    [Authorize(Roles = "Admin,Staff")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMemberMembershipDto dto)
    {
        var result = await _service.CreateAsync(dto);
        if (result is null)
            return BadRequest(new { message = "Member hoặc MembershipPlan không hợp lệ" });

        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateMemberMembershipStatusDto dto)
    {
        var result = await _service.UpdateStatusAsync(id, dto);
        if (result is null) return NotFound();
        return Ok(result);
    }

    // ===== Member tự thao tác cho chính mình =====

    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromBody] SubscribeMembershipDto dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var result = await _service.SubscribeAsync(userId, dto);
        if (result is null)
            return BadRequest(new { message = "Không thể đăng ký gói tập, vui lòng thử lại" });

        return Ok(result);
    }

    [HttpPost("{id}/renew")]
    public async Task<IActionResult> Renew(Guid id, [FromBody] RenewMembershipDto dto)
    {
        var result = await _service.RenewAsync(id, dto);
        if (result is null)
            return BadRequest(new { message = "Không thể gia hạn — gói đã bị huỷ hoặc không tồn tại" });

        return Ok(result);
    }
}