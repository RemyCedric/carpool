namespace Covoiturage.Application.Features.Events.Queries;
public class EventDto : IMapFrom<Event>
{
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Event, EventDto>();
    }

    public int Id { get; set; }

    public String Nom { get; set; } = "";

    public DateTime Date { get; set; }
}