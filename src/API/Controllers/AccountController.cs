using System.Threading.Tasks;
using API.Services;
using Application.Features.Account.Commands.Register;
using Application.Features.Account.Queries.Login;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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

            if (userLogged is null) return BadRequest("Invalid email or password");

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
}