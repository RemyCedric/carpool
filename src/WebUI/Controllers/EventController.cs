
using Covoiturage.Application.Features.Events.Queries;
using Covoiturage.Application.Features.Events.Queries.GetEvents;

namespace Covoiturage.WebUI.Controllers;

[Authorize]
public class EventController : ApiControllerBase
{
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [HttpGet]
    public async Task<IEnumerable<EventDto>> Get()
    {
        return await Mediator.Send(new GetEventsQuery());
    }

}


