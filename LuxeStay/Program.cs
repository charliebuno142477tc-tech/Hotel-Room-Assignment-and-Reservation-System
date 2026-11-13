
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Serve the default HTML page
app.UseDefaultFiles();

// Allow the browser to access CSS, JavaScript, and HTML
app.UseStaticFiles();

// Test API endpoint
app.MapGet("/api/status", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "LuxeStay Hotel Reservation System is running!"
    });
});

app.Run();