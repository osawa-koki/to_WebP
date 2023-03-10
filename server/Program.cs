using SixLabors.ImageSharp;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "MyCORS";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
  policy =>
  {
    policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
  });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

var api = app.MapGroup("/api");
{
  api.MapPost("/to-webp", (HttpRequest request) =>
  {
    try {
      var files = request.Form.Files;
      var uris = new Dictionary<string, string>();
      files.ToList().ForEach(file =>
      {
        string guid = Guid.NewGuid().ToString().ToLower();
        string filename = $"./tmp/{guid}.webp";
        using Image image = Image.Load(file.OpenReadStream());
        image.SaveAsWebp(filename);
        uris.Add(file.FileName, guid);
      });
      return Results.Ok(uris);
    } catch (Exception e) {
      return Results.Problem(e.Message);
    }
  });
  api.MapGet("/webp/{guid}", (string guid) => {
    try {
      return Results.File(File.ReadAllBytes($"./tmp/{guid}.webp"), "image/webp");
    } catch (Exception e) {
      return Results.Problem(e.Message);
    }
  });
}

app.UseRouting();

app.Run("http://+:8080");
