namespace IronGyms.Api.Dtos;

public class MemberDto
{
    public Guid Id {get; set;}
    public string Fullname  {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;

}