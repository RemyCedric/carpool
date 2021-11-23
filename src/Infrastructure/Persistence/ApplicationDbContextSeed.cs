namespace Covoiturage.Infrastructure.Persistence;

public static class ApplicationDbContextSeed
{

    public static async Task SeedDefaultDatabaseAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        await SeedDefaultUserAsync(userManager);
        await SeedSampleDataAsync(context);
        await SeedSampleEventAsync(context);
    }

    public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<ApplicationUser>
                {
                    new ApplicationUser
                    {
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new ApplicationUser
                    {
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$word13");
            }
        }
    }

    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {

        if (!context.WeatherForecasts.Any())
        {
            var dateTime = new DateTimeService();

            string[] Summaries = new[]
            {
                    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
                };

            var rng = new Random();

            var weatherForecasts = Enumerable.Range(1, 10).Select(index => new WeatherForecast
            {
                Date = dateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
            await context.WeatherForecasts.AddRangeAsync(weatherForecasts);
            await context.SaveChangesAsync();
        }
    }
    public static async Task SeedSampleEventAsync(ApplicationDbContext context)
    {

        if (!context.Events.Any())
        {
            string[] names = new[]{
                "Poker","AfterWorks","Lunch","Party","Meeting"
            };
            var dateTime = new DateTimeService();
            var rng = new Random();

            var events = Enumerable.Range(1, 5).Select(index => new Event
            {
                Nom = names[index - 1],
                Date = dateTime.Now.AddDays(rng.Next(index, 33))
            });

            await context.Events.AddRangeAsync(events);
            await context.SaveChangesAsync();
        }
    }
}