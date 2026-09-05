using IronGyms.Api.Models;
using IronGyms.Api.Services;
using IronGyms.Api.DTOs.Members;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]   // toàn bộ controller yêu cầu phải login (có token hợp lệ)
public class MembersController : ControllerBase
{
    private readonly IMemberService _memberService;

    public MembersController(IMemberService memberService)
    {
        _memberService = memberService;
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var members = await _memberService.GetAllAsync();
        return Ok(members);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var member = await _memberService.GetByIdAsync(id);
        if (member is null) return NotFound();
        return Ok(member);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id)) return Unauthorized();

        var member = await _memberService.GetByUserIdDtoAsync(id);   // ← đổi từ GetByUserIdAsync
        if (member is null) return NotFound();

        return Ok(member);
    }

    // [Authorize(Roles = "Admin,Staff")]
    // [HttpPost]
    // public async Task<IActionResult> Create([FromBody] Member member)
    // {
    //     var created = await _memberService.CreateAsync(member);
    //     return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    // }


    [Authorize(Roles = "Member,Admin,Staff")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateMemberDto dto)
    {
        var member = await _memberService.UpdateAsync(id, dto);
        if (member is null) return NotFound();
        return Ok(member);
    }




    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _memberService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}