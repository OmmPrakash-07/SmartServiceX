using System.ComponentModel.DataAnnotations;

namespace dotnet_service.DTOs;

public class AutoAssignmentRequest
{
    [Required]
    public long ComplaintId { get; set; }

    [Required]
    public string Department { get; set; } = string.Empty;
}