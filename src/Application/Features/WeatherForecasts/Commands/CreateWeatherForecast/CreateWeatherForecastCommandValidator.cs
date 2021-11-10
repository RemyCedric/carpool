using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.WeatherForecasts.Commands.CreateWeatherForecast
{
    public class CreateTodoListCommandValidator : AbstractValidator<CreateWeatherForecastCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateTodoListCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Summary)
                .NotEmpty().WithMessage("Summary is required.")
                .MaximumLength(15).WithMessage("Summary must not exceed 15 characters.")
                .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
        }

        public async Task<bool> BeUniqueTitle(string summary, CancellationToken cancellationToken)
        {
            return await _context.WeatherForecasts
                .AllAsync(l => l.Summary != summary);
        }
    }
}
