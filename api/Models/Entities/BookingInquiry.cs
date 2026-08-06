using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AchariTours.Api.Models.Enums;

namespace AchariTours.Api.Models.Entities;

[Table("booking_inquiries")]
public class BookingInquiry
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("reference_code")]
    [MaxLength(20)]
    public string ReferenceCode { get; set; } = string.Empty;

    [Column("tour_id")]
    [MaxLength(50)]
    public string TourId { get; set; } = string.Empty;

    [Column("tour_title")]
    [MaxLength(200)]
    public string TourTitle { get; set; } = string.Empty;

    [Column("preferred_start_date")]
    public DateOnly? PreferredStartDate { get; set; }

    [Column("preferred_end_date")]
    public DateOnly? PreferredEndDate { get; set; }

    [Column("adult_count")]
    public int AdultCount { get; set; } = 2;

    [Column("child_count")]
    public int ChildCount { get; set; } = 0;

    [Column("selected_addons")]
    public List<string> SelectedAddons { get; set; } = [];

    [Column("special_requests")]
    public string? SpecialRequests { get; set; }

    [Required]
    [Column("first_name")]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [Column("last_name")]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [Column("email")]
    [MaxLength(200)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Column("phone")]
    [MaxLength(30)]
    public string? Phone { get; set; }

    [Column("country")]
    [MaxLength(100)]
    public string? Country { get; set; }

    [Column("status")]
    public InquiryStatus Status { get; set; } = InquiryStatus.New;

    [Column("internal_notes")]
    public string? InternalNotes { get; set; }

    // UTM Tracking
    [Column("utm_source")]
    [MaxLength(100)]
    public string? UtmSource { get; set; }

    [Column("utm_medium")]
    [MaxLength(100)]
    public string? UtmMedium { get; set; }

    [Column("utm_campaign")]
    [MaxLength(200)]
    public string? UtmCampaign { get; set; }

    [Column("referrer_url")]
    [MaxLength(500)]
    public string? ReferrerUrl { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ICollection<InquiryStatusHistory> StatusHistory { get; set; } = [];
}
