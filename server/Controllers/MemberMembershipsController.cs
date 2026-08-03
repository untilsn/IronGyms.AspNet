using IronGyms.Api.DTOs.MemberMemberships;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

    [Authorize(Roles = "Admin,Staff")]
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
}