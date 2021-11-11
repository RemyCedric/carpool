using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public IdentityService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public async Task<string> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return user.UserName;
    }

    public async Task<ApplicationUser> GetUserLoggedAsync(string email, string password)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == email);

        if (user is null) return new ApplicationUser();

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        return result.Succeeded ? user : new ApplicationUser();
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUser user, string password)
    {
        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user != null)
        {
            return await DeleteUserAsync(user);
        }

        return Result.Success();
    }

    public async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }


}
