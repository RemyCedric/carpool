namespace Covoiturage.WebUI;

public class Program
{
    public async static Task Main(string[] args)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "WebUI");
        if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);

        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<ApplicationDbContext>();
                if (context.Database.IsRelational())
                {
                    await context.Database.MigrateAsync();
                }

                var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

                await ApplicationDbContextSeed.SeedDefaultUserAsync(userManager);
                await ApplicationDbContextSeed.SeedSampleDataAsync(context);
            }
            catch (Exception ex)
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

                logger.LogError(ex, "An error occurred while migrating or seeding the database.");

                throw;
            }
        }

        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
                webBuilder.UseStartup<Startup>());
}
