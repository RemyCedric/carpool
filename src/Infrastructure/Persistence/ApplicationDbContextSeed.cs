using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
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

    }
}