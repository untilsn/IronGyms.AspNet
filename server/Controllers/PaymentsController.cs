using IronGyms.Api.DTOs.Payments;
using IronGyms.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Staff")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var payments = await _paymentService.GetAllAsync();
        return Ok(payments);
    }

    [HttpGet("membership/{memberMembershipId}")]
    public async Task<IActionResult> GetByMembership(Guid memberMembershipId)
    {
        var payments = await _paymentService.GetByMemberMembershipIdAsync(memberMembershipId);
        return Ok(payments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        if (payment is null) return NotFound();
        return Ok(payment);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePaymentDto dto)
    {
        var payment = await _paymentService.CreateAsync(dto);
        if (payment is null)
            return BadRequest(new { message = "MemberMembership không tồn tại" });

        return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
    }
}