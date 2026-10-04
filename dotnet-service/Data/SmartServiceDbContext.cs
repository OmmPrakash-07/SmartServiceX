using Microsoft.EntityFrameworkCore;
using dotnet_service.Models;

namespace dotnet_service.Data;

public class SmartServiceDbContext : DbContext
{
    public SmartServiceDbContext(
        DbContextOptions<SmartServiceDbContext> options
    ) : base(options)
    {
    }

    public DbSet<Employee> Employees => Set<Employee>();

    public DbSet<Assignment> Assignments => Set<Assignment>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder
    )
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasIndex(e => e.Email)
            .IsUnique();

        modelBuilder.Entity<Assignment>()
            .HasOne(a => a.Employee)
            .WithMany()
            .HasForeignKey(a => a.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}