using SixLabors.ImageSharp;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
    var files = request.Form.Files;
    var content = new MultipartFormDataContent();
    files.ToList().ForEach(file =>
    {
      string guid = Guid.NewGuid().ToString().ToLower();
      string filename = $"./tmp/{guid}.webp";
      using Image image = Image.Load(file.OpenReadStream());
      image.SaveAsWebp(filename);
      content.Add(new ByteArrayContent(File.ReadAllBytes(filename)), "file", $"{file.Name}.webp");
    });
    
    return new HttpResponseMessage(HttpStatusCode.OK)
    {
      Content = content,
    };
  });
}

app.UseRouting();

app.Run("http://+:8080");
