using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Bnan_Whatsapp.Infrastructure;
using Bnan_Whatsapp.Infrastructure.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Org.BouncyCastle.Asn1.X509.Qualified;
using System.Configuration;


    var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

    builder.Services.AddControllers();
    builder.Services.AddControllersWithViews();
    builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        p=>p.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
        )
    );

//builder.Services.AddIdentity<BnanWhatsappSender, IdentityRole >(options =>
//{
//    options.SignIn.RequireConfirmedAccount = false;

//}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

builder.Services.AddRazorPages();

builder.Services.AddTransient(typeof(IBaseRepository<>),typeof(BaseRepository<>));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

builder.Services.AddSession();


var app = builder.Build();

// for Swagger (optional)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

app.MapRazorPages();

app.MapControllers();

app.Run();
