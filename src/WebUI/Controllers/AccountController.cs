using Carpool.Application.Features.Account.Commands.Register;
using Carpool.Application.Features.Account.Queries.CurrentUser;
using Carpool.Application.Features.Account.Queries.Login;
using Microsoft.AspNetCore.WebUtilities;

namespace Carpool.WebUI.Controllers;

[Authorize]
public class AccountController : ApiControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly TokenService _tokenService;
    private readonly IEmailSender _emailSender;
    public AccountController(UserManager<ApplicationUser> userManager, TokenService tokenService, IEmailSender emailSender)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _emailSender = emailSender;
    }


    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var userLogged = await Mediator.Send(new LoginQuery { Email = loginDto.Email, Password = loginDto.Password });

        if (string.IsNullOrEmpty(userLogged.UserName)) return BadRequest("Invalid email or password");

        if (!userLogged.EmailConfirmed) return Unauthorized("Email not confirmed");


        return Ok(CreateUserObject(userLogged));
    }

    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    [HttpPost("register")]
    public async Task<ActionResult<string>> Register(RegisterDto registerDto)
    {
        var userRegistered = await Mediator.Send(new RegisterCommand
        {
            Email = registerDto.Email,
            Password = registerDto.Password,
            Username = registerDto.Username
        });

        if (userRegistered is null) return BadRequest("Problem registering user");



        var origin = Request.Headers["origin"];
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(userRegistered);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={userRegistered.Email}";
        var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify Email</a></p>";

        await _emailSender.SendEmailAsync(userRegistered.Email, "Please verify email", message);

        return Ok("Registration success - please verify email");
    }

    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(void))]
    [HttpPost("verifyEmail")]
    public async Task<IActionResult> VerifyEmail(string token, string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return Unauthorized();

        var decodeTokenBytes = WebEncoders.Base64UrlDecode(token);
        var decodeToken = Encoding.UTF8.GetString(decodeTokenBytes);
        var result = await _userManager.ConfirmEmailAsync(user, decodeToken);

        if (!result.Succeeded) return BadRequest("Could not verify email address");

        return Ok("Email confirmed you can now login");
    }


    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(void))]
    [HttpGet("resendEmailConfirmationLink")]
    public async Task<IActionResult> ResendEmailConfirmationLink(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return Unauthorized();

        var origin = Request.Headers["origin"];
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/verifyEmail?token={token}&email={user.Email}";
        var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify Email</a></p><p>The link will be alive two hours</p>";

        await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

        return Ok("Verification email resent - please verify email");
    }

    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(void))]
    [HttpPost("forgotPassword")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return Unauthorized();
        var origin = Request.Headers["origin"];

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var resetUrl = $"{origin}/resetPassword?token={token}&email={user.Email}";
        var message = $"<p>Please click the below link to reset your password:</p><p><a href='{resetUrl}'>Click to reset Password</a></p><p>The link will be alive two hours</p>";

        await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

        return Ok("Reset email sent - please verify email");
    }

    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(void))]
    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(string email, string token, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return Unauthorized();

        var resetPasswordResult = await _userManager.ResetPasswordAsync(user, token, password);
        if (!resetPasswordResult.Succeeded)
        {
            foreach (var error in resetPasswordResult.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        return Ok("Password reset");
    }


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
