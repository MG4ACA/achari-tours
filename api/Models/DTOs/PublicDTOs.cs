using System.ComponentModel.DataAnnotations;

namespace AchariTours.Api.Models.DTOs;

public record CreateInquiryRequest
{
    [MaxLength(50)]
    public string? TourId { get; init; }

    [MaxLength(200)]
    public string? TourTitle { get; init; }

    public DateOnly? PreferredStartDate { get; init; }
    public DateOnly? PreferredEndDate { get; init; }
    public int AdultCount { get; init; } = 2;
    public int ChildCount { get; init; } = 0;
    public List<string> SelectedAddons { get; init; } = [];
    public string? SpecialRequests { get; init; }

    [Required]
    [MaxLength(100)]
    public required string FirstName { get; init; }

    [Required]
    [MaxLength(100)]
    public required string LastName { get; init; }

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public required string Email { get; init; }

    [MaxLength(30)]
    public string? Phone { get; init; }

    [MaxLength(100)]
    public string? Country { get; init; }

    // UTM Tracking
    [MaxLength(100)]
    public string? UtmSource { get; init; }

    [MaxLength(100)]
    public string? UtmMedium { get; init; }

    [MaxLength(200)]
    public string? UtmCampaign { get; init; }

    [MaxLength(500)]
    public string? ReferrerUrl { get; init; }
}

public record InquiryResponse
{
    public Guid Id { get; init; }
    public string ReferenceCode { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
}

public record CreateContactRequest
{
    [Required]
    [MaxLength(200)]
    public required string Name { get; init; }

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public required string Email { get; init; }

    [MaxLength(200)]
    public string? Subject { get; init; }

    [Required]
    public required string Message { get; init; }
}

public record NewsletterSubscribeRequest
{
    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public required string Email { get; init; }

    [MaxLength(50)]
    public string? Source { get; init; }

    [MaxLength(100)]
    public string? UtmSource { get; init; }
}
