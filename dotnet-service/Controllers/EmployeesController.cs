using dotnet_service.Data;
using dotnet_service.DTOs;
using dotnet_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeesController : ControllerBase
{
    private readonly SmartServiceDbContext _context;

    public EmployeesController(
        SmartServiceDbContext context
    )
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEmployee(
        CreateEmployeeRequest request
    )
    {
        bool emailExists =
            await _context.Employees
                .AnyAsync(e => e.Email == request.Email);

        if (emailExists)
        {
            return Conflict(new
            {
                message = "Employee email already exists"
            });
        }

        var employee = new Employee
        {
            Name = request.Name,
            Email = request.Email,
            Department = request.Department,
            Designation = request.Designation
        };

        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetEmployee),
            new { id = employee.Id },
            employee
        );
    }

    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        var employees =
            await _context.Employees
                .AsNoTracking()
                .ToListAsync();

        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(
        int id
    )
    {
        var employee =
            await _context.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee == null)
        {
            return NotFound(new
            {
                message = "Employee not found"
            });
        }

        return Ok(employee);
    }

    [HttpPut("{id}/availability")]
    public async Task<IActionResult> UpdateAvailability(
    int id,
    [FromBody] bool isAvailable)
    {
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == id);

        if (employee == null)
        {
            return NotFound(new
            {
                message = "Employee not found"
            });
        }

        employee.IsAvailable = isAvailable;

        await _context.SaveChangesAsync();

        return Ok(employee);
    }
}