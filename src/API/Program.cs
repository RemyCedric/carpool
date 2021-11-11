using Application;
using Application.Common.Interfaces;
using API.Extensions;
using API.Filters;
using API.Services;
using Domain.Entities;
using Infrastructure;
using Infrastructure.Persistence;


var builder = WebApplication.CreateBuilder(args);

// add services to container
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerServices();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
    options.Filters.Add<ApiExceptionFilterAttribute>();
}).AddFluentValidation(x => x.AutomaticValidationEnabled = false);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000", "http://localhost:5000");
    });
});

//Configure the http request pipeline

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

//app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");


using (var scope = app.Services.CreateScope())
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

await app.RunAsync();