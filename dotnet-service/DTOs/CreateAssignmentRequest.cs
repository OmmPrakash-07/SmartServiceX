using System.ComponentModel.DataAnnotations;

namespace dotnet_service.DTOs;

public class CreateAssignmentRequest
{
    [Required]
    public long ComplaintId { get; set; }

    [Required]
    public int EmployeeId { get; set; }
}