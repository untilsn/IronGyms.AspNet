using Microsoft.AspNetCore.Mvc;
using IronGyms.Api.Models;
namespace IronGyms.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PingController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "pong", time = DateTime.UtcNow });
    }

    [HttpGet("{name}")]
    public IActionResult GetByName(string name)
    {
        return Ok(new { message = $"pong, {name}"});
    }

    [HttpPost]
    public IActionResult Post([FromBody] object body)
    {
        return Ok(new {received = body});
    }
    
    [HttpGet("members")]

    public IActionResult GetFakeMembers()
    {
        var members = new List<Member>
        {
         new() {Fullname = "van a", Email = "vana@gmail.com"},
         new() {Fullname = "van b", Email = "vanb@gmail.com"},

        };
        return Ok(members);
    }
}

