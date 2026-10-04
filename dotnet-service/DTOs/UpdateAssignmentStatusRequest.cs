using System.ComponentModel.DataAnnotations;

namespace dotnet_service.DTOs;

public class UpdateAssignmentStatusRequest
{
    [Required]
    public string Status { get; set; } = string.Empty;
}