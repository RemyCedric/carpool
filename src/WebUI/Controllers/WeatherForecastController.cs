using Covoiturage.Application.Features.WeatherForecasts.Commands.CreateWeatherForecast;
using Covoiturage.Application.Features.WeatherForecasts.Queries.GetWeatherForecasts;

namespace Covoiturage.WebUI.Controllers;

public class WeatherForecastController : ApiControllerBase
{

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<WeatherForecastDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [HttpGet]
    public async Task<IEnumerable<WeatherForecastDto>> Get()
    {
        return await Mediator.Send(new GetWeatherForecastsQuery());
    }

    [HttpPost]
    public async Task<int> Post(CreateWeatherForecastCommand command)
    {
        return await Mediator.Send(command);

    }
}
