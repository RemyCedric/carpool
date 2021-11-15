
namespace Covoiturage.Application.Features.Account.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public RegisterCommandValidator(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
        RuleFor(v => v.Email)
            .NotEmpty().WithMessage("The email field can't be empty")
            .Matches($"^[A-Za-z0-9._%+-]+@test.com$").WithMessage("The email isn't valid, please enter an 'positivethinking.lu' email")
            .MustAsync(BeUniqueEmail).WithMessage("The specified Email already exists.");
        RuleFor(v => v.Password)
            .NotEmpty().WithMessage("The password should contain at least 8 characters")
            .Length(8).WithMessage("The password should contain at least 8 characters")
            .Matches(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[0-9])@$%^&*-]).{8,}$")
                .WithMessage($"The password isn't valid, it should contain at least one upperase letter, one lowercase letter, one number thus one special character");
    }

    public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
        return await _userManager.Users
            .AllAsync(u => u.Email.ToLower() != email.ToLower());
    }
}