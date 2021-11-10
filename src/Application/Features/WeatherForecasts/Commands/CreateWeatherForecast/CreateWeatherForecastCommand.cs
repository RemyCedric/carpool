using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.WeatherForecasts.Commands.CreateWeatherForecast
{
    public class CreateWeatherForecastCommand : IRequest<int>
    {
        public string Summary { get; set; }
        public int TemperatureC { get; set; }

    }

    public class CreateTodoListCommandHandler : IRequestHandler<CreateWeatherForecastCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTime;

        public CreateTodoListCommandHandler(IApplicationDbContext context, IDateTime dateTime)
        {
            _dateTime = dateTime;
            _context = context;
        }

        public async Task<int> Handle(CreateWeatherForecastCommand request, CancellationToken cancellationToken)
        {
            var entity = new WeatherForecast
            {
                Date = _dateTime.Now,
                Summary = request.Summary,
                TemperatureC = request.TemperatureC
            };

            _context.WeatherForecasts.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
