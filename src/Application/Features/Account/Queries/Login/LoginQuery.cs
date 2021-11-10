using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Account.Queries.Login
{
    public class LoginQuery : IRequest<ApplicationUser>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginQueryHandler : IRequestHandler<LoginQuery, ApplicationUser>
    {
        private readonly IIdentityService _identityService;

        public LoginQueryHandler(IIdentityService identityService)
        {
            _identityService = identityService;

        }
        public async Task<ApplicationUser> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            return await _identityService.GetUserLoggedAsync(request.Email, request.Password);
        }
    }
}