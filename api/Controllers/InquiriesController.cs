using Microsoft.AspNetCore.Mvc;
using AchariTours.Api.Data;
using AchariTours.Api.Models.DTOs;
using AchariTours.Api.Models.Entities;
using AchariTours.Api.Models.Enums;

namespace AchariTours.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InquiriesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<InquiriesController> _logger;

    public InquiriesController(AppDbContext db, ILogger<InquiriesController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Submit a new booking inquiry (public endpoint)
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<InquiryResponse>> CreateInquiry([FromBody] CreateInquiryRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Generate reference code: ACH-YYYYMM-XXXXX
        var count = _db.BookingInquiries.Count() + 1;
        var referenceCode = $"ACH-{DateTime.UtcNow:yyyyMM}-{count:D5}";

        var inquiry = new BookingInquiry
        {
            ReferenceCode = referenceCode,
            TourId = request.TourId ?? string.Empty,
            TourTitle = request.TourTitle ?? string.Empty,
            PreferredStartDate = request.PreferredStartDate,
            PreferredEndDate = request.PreferredEndDate,
            AdultCount = request.AdultCount,
            ChildCount = request.ChildCount,
            SelectedAddons = request.SelectedAddons,
            SpecialRequests = request.SpecialRequests,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            Country = request.Country,
            Status = InquiryStatus.New,
            UtmSource = request.UtmSource,
            UtmMedium = request.UtmMedium,
            UtmCampaign = request.UtmCampaign,
            ReferrerUrl = request.ReferrerUrl,
        };

        _db.BookingInquiries.Add(inquiry);

        // Create initial status history
        _db.InquiryStatusHistory.Add(new InquiryStatusHistory
        {
            InquiryId = inquiry.Id,
            NewStatus = InquiryStatus.New,
            Note = "Inquiry received from website",
        });

        // Create admin notification
        _db.AdminNotifications.Add(new AdminNotification
        {
            Type = "new_inquiry",
            Title = $"New Booking Inquiry: {request.FirstName} {request.LastName}",
            Message = $"{request.TourTitle} · {request.AdultCount} adults · {request.Country}",
            LinkUrl = $"/admin/inquiries/{inquiry.Id}",
        });

        await _db.SaveChangesAsync();

        _logger.LogInformation("New booking inquiry {ReferenceCode} from {Email}", referenceCode, request.Email);

        // TODO: Send email notification to admin

        return CreatedAtAction(nameof(CreateInquiry), new InquiryResponse
        {
            Id = inquiry.Id,
            ReferenceCode = referenceCode,
            Message = "Thank you! Your booking inquiry has been received. We'll get back to you within 24 hours.",
        });
    }
}
