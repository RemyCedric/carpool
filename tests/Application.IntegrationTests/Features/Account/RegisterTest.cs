using Covoiturage.Application.Features.Account.Commands.Register;

namespace Covoiturage.Application.IntegrationTests.Features.Account;

using static Testing;

public class RegisterTest : TestBase
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new RegisterCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldRegister()
    {
        var command = new RegisterCommand
        {
            Username = "Username",
            Password = "Pa$$word13",
            Email = "test@test.com"
        };

        var user = await SendAsync(command);

        user!.UserName.Should().Be("Username");
        user!.Email.Should().Be("test@test.com");
    }
}

