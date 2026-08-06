using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AchariTours.Api.Models.Enums;

namespace AchariTours.Api.Models.Entities;

[Table("inquiry_status_history")]
public class InquiryStatusHistory
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("inquiry_id")]
    public Guid InquiryId { get; set; }

    [Column("old_status")]
    public InquiryStatus? OldStatus { get; set; }

    [Column("new_status")]
    public InquiryStatus NewStatus { get; set; }

    [Column("changed_by")]
    [MaxLength(100)]
    public string? ChangedBy { get; set; }

    [Column("note")]
    public string? Note { get; set; }

    [Column("changed_at")]
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    [ForeignKey(nameof(InquiryId))]
    public BookingInquiry? Inquiry { get; set; }
}
