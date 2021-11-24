namespace Carpool.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string> GetUserNameAsync(string userId);

    Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUser user, string password);

    Task<Result> DeleteUserAsync(string userId);

    Task<ApplicationUser> GetUserLoggedAsync(string email, string password);

    Task<ApplicationUser> GetCurrentUserByEmailAsync(string email);

}
