using Covoiturage.Application.Features.Account.Commands.Register;
using Covoiturage.Application.Features.Account.Queries.Login;

namespace Covoiturage.WebUI.Controllers;

[AllowAnonymous]
public class AccountController : ApiControllerBase
{
    private readonly TokenService _tokenService;
    public AccountController(TokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<(string, string)>> Login(LoginQuery query)
    {
        var userLogged = await Mediator.Send(query);

        if (string.IsNullOrEmpty(userLogged.UserName)) return BadRequest("Invalid email or password");

        return Ok(CreateUserObject(userLogged));
    }

    [HttpPost("register")]
    public async Task<ActionResult<(string, string)>> Register(RegisterCommand command)
    {
        var userRegistered = await Mediator.Send(command);

        if (userRegistered is null) return BadRequest("Problem registering user");

        return Ok(CreateUserObject(userRegistered));
    }

    private object CreateUserObject(ApplicationUser user)
    {
        return new { token = _tokenService.CreateToken(user), username = user.UserName };
    }
}
