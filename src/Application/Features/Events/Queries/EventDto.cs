namespace Covoiturage.Application.Features.Events.Queries;
public class EventDto : IMapFrom<Event>
{
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Event, EventDto>()
            .ForMember(d => d.url, o => o.MapFrom(s => s.Photo!.Url));
    }

    public int Id { get; set; }

    public string Nom { get; set; } = "";

    public DateTime Date { get; set; }
    public string url { get; set; } = "";
}