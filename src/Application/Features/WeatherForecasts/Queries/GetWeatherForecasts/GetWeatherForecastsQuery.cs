using Application.Common.Interfaces;

namespace Application.Features.WeatherForecasts.Queries.GetWeatherForecasts;

public class GetWeatherForecastsQuery : IRequest<IEnumerable<WeatherForecastDto>>
{
}

public class GetWeatherForecastsQueryHandler : IRequestHandler<GetWeatherForecastsQuery, IEnumerable<WeatherForecastDto>>
{

    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetWeatherForecastsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;

    }

    public async Task<IEnumerable<WeatherForecastDto>> Handle(GetWeatherForecastsQuery request, CancellationToken cancellationToken)
    {
        return await _context.WeatherForecasts
            .ProjectTo<WeatherForecastDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}
