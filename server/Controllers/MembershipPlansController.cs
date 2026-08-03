using IronGyms.Api.DTOs.MembershipPlans;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MembershipPlansController : ControllerBase
{
    private readonly IMembershipPlanService _planService;

    public MembershipPlansController(IMembershipPlanService planService)
    {
        _planService = planService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var plans = await _planService.GetAllAsync();
        return Ok(plans);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var plan = await _planService.GetByIdAsync(id);
        if (plan is null) return NotFound();
        return Ok(plan);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMembershipPlanDto dto)
    {
        var plan = await _planService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = plan.Id }, plan);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateMembershipPlanDto dto)
    {
        var plan = await _planService.UpdateAsync(id, dto);
        if (plan is null) return NotFound();
        return Ok(plan);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _planService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}