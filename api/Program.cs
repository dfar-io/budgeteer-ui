using System.Globalization;
using BudgeteerApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BudgeteerContext>(
    opt => opt.UseInMemoryDatabase("BudgeteerDb")
);

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

// https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-8.0&tabs=visual-studio
app.MapGet("", () =>
{
    var jsonResponse = new
    {
        ThisAssembly.Git.RepositoryUrl,
        Sha = ThisAssembly.Git.Sha[..7]
    };
    return Results.Json(jsonResponse);
});

app.MapGet("/lineitems", async (BudgeteerContext db) =>
    await db.LineItems.ToListAsync()
);

app.MapPost("/lineitems", async (LineItem lineItem, BudgeteerContext db) =>
{
    db.LineItems.Add(lineItem);
    await db.SaveChangesAsync();

    return Results.Created($"/lineitems/{lineItem.Id}", lineItem);
});

app.MapPut("/lineitems/{id}", async (int id, LineItem inputLineItem, BudgeteerContext db) =>
{
    var lineItem = await db.LineItems.FindAsync(id);

    if (lineItem is null) return Results.NotFound();

    lineItem.Name = inputLineItem.Name;
    lineItem.Amount = inputLineItem.Amount;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/lineitems/{id}", async (int id, BudgeteerContext db) =>
{
    if (await db.LineItems.FindAsync(id) is LineItem lineItem)
    {
        db.LineItems.Remove(lineItem);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});


app.Run();