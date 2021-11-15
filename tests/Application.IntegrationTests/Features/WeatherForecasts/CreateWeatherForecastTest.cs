using Covoiturage.Application.Features.WeatherForecasts.Commands.CreateWeatherForecast;

namespace Covoiturage.Application.IntegrationTests.Features.WeatherForecasts;

using static Testing;

public class CreateWeatherForecastTest : TestBase
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreateWeatherForecastCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreateWeatherForecast()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateWeatherForecastCommand
        {
            Summary = "New weather"
        };

        var weatherForecastId = await SendAsync(command);


        var weatherForecast= await FindAsync<WeatherForecast>(weatherForecastId);

        weatherForecast.Should().NotBeNull();
        weatherForecast!.Summary.Should().Be(command.Summary);
        weatherForecast!.TemperatureC.Should().Be(command.TemperatureC);
        weatherForecast.CreatedBy.Should().Be(userId);
        weatherForecast.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        weatherForecast.LastModifiedBy.Should().BeNull();
        weatherForecast.LastModified.Should().BeNull();
    }
}
