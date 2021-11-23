namespace Covoiturage.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<WeatherForecast> WeatherForecasts { get; }
    DbSet<Event> Events { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
