using IronGyms.Api.DTOs.Trainers;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TrainersController : ControllerBase
{
    private readonly ITrainerService _trainerService;

    public TrainersController(ITrainerService trainerService)
    {
        _trainerService = trainerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var trainers = await _trainerService.GetAllAsync();
        return Ok(trainers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var trainer = await _trainerService.GetByIdAsync(id);
        if (trainer is null) return NotFound();
        return Ok(trainer);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTrainerDto dto)
    {
        var trainer = await _trainerService.CreateAsync(dto);
        if (trainer is null)
            return Conflict(new { message = "Email đã được sử dụng" });

        return CreatedAtAction(nameof(GetById), new { id = trainer.Id }, trainer);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTrainerDto dto)
    {
        var trainer = await _trainerService.UpdateAsync(id, dto);
        if (trainer is null) return NotFound();
        return Ok(trainer);
    }



}