using Application.Features.WeatherForecasts.Commands.CreateWeatherForecast;
using Application.Features.WeatherForecasts.Queries.GetWeatherForecasts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    public class WeatherForecastController : ApiControllerBase
    {
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
}
