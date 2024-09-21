using System.Globalization;
using BudgeteerApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BudgeteerContext>(opt =>
    opt.UseInMemoryDatabase("BudgeteerDb"));

// Configure OpenTelemetry
// const string openTelemetryServiceName = "budgeteer";
// builder.Logging.AddOpenTelemetry(options =>
// {
//     options
//         .SetResourceBuilder(
//             ResourceBuilder.CreateDefault()
//                 .AddService(serviceName))
//         .AddConsoleExporter();
// });
// builder.Services.AddOpenTelemetry()
//       .ConfigureResource(resource => resource.AddService(serviceName))
//       .WithTracing(tracing => tracing
//           .AddAspNetCoreInstrumentation()
//           .AddConsoleExporter())
//       .WithMetrics(metrics => metrics
//           .AddAspNetCoreInstrumentation()
//           .AddConsoleExporter());

var app = builder.Build();

string HandleRollDice([FromServices]ILogger<Program> logger, string? player)
{
    var result = RollDice();

    if (string.IsNullOrEmpty(player))
    {
        logger.LogInformation("Anonymous player is rolling the dice: {result}", result);
    }
    else
    {
        logger.LogInformation("{player} is rolling the dice: {result}", player, result);
    }

    return result.ToString(CultureInfo.InvariantCulture);
}

int RollDice()
{
    return Random.Shared.Next(1, 7);
}

app.MapGet("/rolldice/{player?}", HandleRollDice);

app.Run();