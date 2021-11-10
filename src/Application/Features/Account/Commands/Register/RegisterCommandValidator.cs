using Application.Common.Interfaces;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Account.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterCommandValidator(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;

            RuleFor(v => v.Username)
                .NotEmpty().WithMessage("Username field can't be empty nor exceed 15 characters")
                .MaximumLength(15).WithMessage("Username can't exceed 15 characters")
                .MustAsync(BeUniqueUsername).WithMessage("The specified Username already exists.");
            RuleFor(v => v.Email)
                .NotEmpty().WithMessage("Email field can't be empty")
                .Matches($"^[A-Za-z0-9._%+-]+@test.com$").WithMessage("The email isn't valid")
                .MustAsync(BeUniqueEmail).WithMessage("The specified Email already exists.");
        }

        public async Task<bool> BeUniqueUsername(string username, CancellationToken cancellationToken)
        {
            return await _userManager.Users
                .AllAsync(u => u.UserName.ToLower() != username.ToLower());
        }

        public bool BeValidEmail(string email)
        {

            return true;
        }
        public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
        {
            return await _userManager.Users
                .AllAsync(u => u.Email.ToLower() != email.ToLower());
        }
    }
}
