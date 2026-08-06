using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AchariTours.Api.Models.Entities;

[Table("admin_notifications")]
public class AdminNotification
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Column("type")]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty;  // new_inquiry, new_contact, status_change

    [Required]
    [Column("title")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Column("message")]
    public string? Message { get; set; }

    [Column("link_url")]
    [MaxLength(500)]
    public string? LinkUrl { get; set; }

    [Column("is_read")]
    public bool IsRead { get; set; } = false;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
