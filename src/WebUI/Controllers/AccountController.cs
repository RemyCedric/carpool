using Covoiturage.Application.Features.Account.Commands.Register;
using Covoiturage.Application.Features.Account.Queries.CurrentUser;
using Covoiturage.Application.Features.Account.Queries.Login;

namespace Covoiturage.WebUI.Controllers;

public class AccountController : ApiControllerBase
{
    private readonly TokenService _tokenService;
    public AccountController(TokenService tokenService)
    {
        _tokenService = tokenService;
    }


    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var userLogged = await Mediator.Send(new LoginQuery { Email = loginDto.Email, Password = loginDto.Password });

        if (string.IsNullOrEmpty(userLogged.UserName)) return BadRequest("Invalid email or password");

        return Ok(CreateUserObject(userLogged));
    }


    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var userRegistered = await Mediator.Send(new RegisterCommand
        {
            Email = registerDto.Email,
            Password = registerDto.Password,
            Username = registerDto.Username
        });

        if (userRegistered is null) return BadRequest("Problem registering user");

        return Ok(CreateUserObject(userRegistered));
    }

    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await Mediator.Send(new CurrentUserQuery());
        if (user is null) return BadRequest("Problem getting the current user");
        return CreateUserObject(user);
    }
    private UserDto CreateUserObject(ApplicationUser user)
    {
        return new UserDto { Token = _tokenService.CreateToken(user), Username = user.UserName };
    }
}
