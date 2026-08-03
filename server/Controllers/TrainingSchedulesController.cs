using IronGyms.Api.DTOs.TrainingSchedules;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TrainingSchedulesController : ControllerBase
{
    private readonly ITrainingScheduleService _service;

    public TrainingSchedulesController(ITrainingScheduleService service)
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

    [HttpGet("trainer/{trainerId}")]
    public async Task<IActionResult> GetByTrainer(Guid trainerId)
    {
        var result = await _service.GetByTrainerIdAsync(trainerId);
        return Ok(result);
    }

    [HttpGet("member/{memberId}")]
    public async Task<IActionResult> GetByMember(Guid memberId)
    {
        var result = await _service.GetByMemberIdAsync(memberId);
        return Ok(result);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTrainingScheduleDto dto)
    {
        var result = await _service.CreateAsync(dto);
        if (result is null)
            return BadRequest(new { message = "Trainer/Member không hợp lệ, thời gian sai, hoặc Trainer đã có lịch trùng" });

        return CreatedAtAction(nameof(GetByTrainer), new { trainerId = result.TrainerId }, result);
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateTrainingScheduleStatusDto dto)
    {
        var result = await _service.UpdateStatusAsync(id, dto);
        if (result is null) return NotFound();
        return Ok(result);
    }
}