using dotnet_service.Data;
using dotnet_service.DTOs;
using dotnet_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Controllers;

[ApiController]
[Route("api/assignments")]
public class AssignmentsController : ControllerBase
{
    private readonly SmartServiceDbContext _context;

    public AssignmentsController(
        SmartServiceDbContext context
    )
    {
        _context = context;
    }

    // POST: api/assignments
    [HttpPost]
    public async Task<IActionResult> CreateAssignment(
        CreateAssignmentRequest request
    )
    {
        var employee =
            await _context.Employees
                .FirstOrDefaultAsync(
                    e => e.Id == request.EmployeeId
                );

        if (employee == null)
        {
            return NotFound(new
            {
                message = "Employee not found"
            });
        }

        if (!employee.IsAvailable)
        {
            return BadRequest(new
            {
                message = "Employee is currently unavailable"
            });
        }

        var existingAssignment =
            await _context.Assignments
                .AnyAsync(a =>
                    a.ComplaintId == request.ComplaintId &&
                    a.Status != "CLOSED"
                );

        if (existingAssignment)
        {
            return Conflict(new
            {
                message = "Complaint is already assigned"
            });
        }

        var assignment = new Assignment
        {
            ComplaintId = request.ComplaintId,
            EmployeeId = request.EmployeeId,
            Status = "ASSIGNED"
        };

        _context.Assignments.Add(assignment);

        // Employee is no longer available
        employee.IsAvailable = false;

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetAssignment),
            new { id = assignment.Id },
            assignment
        );
    }

    // POST: api/assignments/auto
    [HttpPost("auto")]
    public async Task<IActionResult> AutoAssign(
        AutoAssignmentRequest request
    )
    {
        // Check whether complaint is already assigned
        var existingAssignment =
            await _context.Assignments
                .AnyAsync(a =>
                    a.ComplaintId == request.ComplaintId &&
                    a.Status != "CLOSED"
                );

        if (existingAssignment)
        {
            return Conflict(new
            {
                message = "Complaint is already assigned"
            });
        }

        // Find an available employee from the requested department
        var employee =
            await _context.Employees
                .Where(e =>
                    e.Department == request.Department &&
                    e.IsAvailable)
                .OrderBy(e => e.Id)
                .FirstOrDefaultAsync();

        if (employee == null)
        {
            return NotFound(new
            {
                message = "No available employee found for this department"
            });
        }

        var assignment = new Assignment
        {
            ComplaintId = request.ComplaintId,
            EmployeeId = employee.Id,
            Status = "ASSIGNED"
        };

        _context.Assignments.Add(assignment);

        // Employee becomes unavailable
        employee.IsAvailable = false;

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetAssignment),
            new { id = assignment.Id },
            assignment
        );
    }

    // GET: api/assignments
    [HttpGet]
    public async Task<IActionResult> GetAssignments()
    {
        var assignments =
            await _context.Assignments
                .Include(a => a.Employee)
                .AsNoTracking()
                .ToListAsync();

        return Ok(assignments);
    }

    // GET: api/assignments/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAssignment(
        int id
    )
    {
        var assignment =
            await _context.Assignments
                .Include(a => a.Employee)
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    a => a.Id == id
                );

        if (assignment == null)
        {
            return NotFound(new
            {
                message = "Assignment not found"
            });
        }

        return Ok(assignment);
    }

    // PUT: api/assignments/{id}/status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateAssignmentStatus(
        int id,
        UpdateAssignmentStatusRequest request
    )
    {
        var assignment =
            await _context.Assignments
                .Include(a => a.Employee)
                .FirstOrDefaultAsync(
                    a => a.Id == id
                );

        if (assignment == null)
        {
            return NotFound(new
            {
                message = "Assignment not found"
            });
        }

        var allowedStatuses = new[]
        {
            "ASSIGNED",
            "IN_PROGRESS",
            "COMPLETED",
            "CLOSED"
        };

        if (!allowedStatuses.Contains(request.Status))
        {
            return BadRequest(new
            {
                message = "Invalid assignment status"
            });
        }

        assignment.Status = request.Status;

        // Employee becomes available when assignment is completed or closed
        if (request.Status == "COMPLETED" ||
            request.Status == "CLOSED")
        {
            if (assignment.Employee != null)
            {
                assignment.Employee.IsAvailable = true;
            }
        }
        else
        {
            if (assignment.Employee != null)
            {
                assignment.Employee.IsAvailable = false;
            }
        }

        await _context.SaveChangesAsync();

        return Ok(assignment);
    }
}