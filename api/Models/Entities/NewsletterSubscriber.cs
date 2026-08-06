using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AchariTours.Api.Models.Entities;

[Table("newsletter_subscribers")]
public class NewsletterSubscriber
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Column("email")]
    [MaxLength(200)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Column("source")]
    [MaxLength(50)]
    public string? Source { get; set; }

    [Column("utm_source")]
    [MaxLength(100)]
    public string? UtmSource { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("subscribed_at")]
    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;

    [Column("unsubscribed_at")]
    public DateTime? UnsubscribedAt { get; set; }
}
