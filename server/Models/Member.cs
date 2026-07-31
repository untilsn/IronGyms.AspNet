namespace IronGyms.Api.Models;

public class Member
{
    public Guid Id {get; set;} = Guid.NewGuid();
    public String Fullname {get; set;} = string.Empty;
    public String Email {get; set;} = string.Empty;
}