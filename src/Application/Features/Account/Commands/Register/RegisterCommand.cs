
namespace Covoiturage.Application.Features.Account.Commands.Register;

public class RegisterCommand : IRequest<ApplicationUser>
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Username { get; set; } = "";
}
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ApplicationUser>
{
    private readonly IIdentityService _identityService;
    public RegisterCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;

    }
    public async Task<ApplicationUser> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            Email = request.Email,
            UserName = request.Username
        };
        var result = await _identityService.CreateUserAsync(user, request.Password);

        return result.Result.Succeeded ? user : null!;
    }
}
