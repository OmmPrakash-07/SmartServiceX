namespace dotnet_service.Models;

public class Assignment
{
    public int Id { get; set; }

    public long ComplaintId { get; set; }

    public int EmployeeId { get; set; }

    public string Status { get; set; } = "ASSIGNED";

    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    public Employee? Employee { get; set; }
}