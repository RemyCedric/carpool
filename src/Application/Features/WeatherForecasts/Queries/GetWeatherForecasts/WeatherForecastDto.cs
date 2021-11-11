using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Features.WeatherForecasts.Queries.GetWeatherForecasts;

public class WeatherForecastDto : IMapFrom<WeatherForecast>
{
    public void Mapping(Profile profile)
    {
        profile.CreateMap<WeatherForecast, WeatherForecastDto>()
            .ForMember(d => d.TemperatureF, opt => opt.MapFrom(s => 32 + (int)(s.TemperatureC / 0.5556)));
    }

    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF { get; set; }

    public string Summary { get; set; } = "";
}
