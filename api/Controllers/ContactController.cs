using Microsoft.AspNetCore.Mvc;
using AchariTours.Api.Data;
using AchariTours.Api.Models.DTOs;
using AchariTours.Api.Models.Entities;

namespace AchariTours.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<ContactController> _logger;

    public ContactController(AppDbContext db, ILogger<ContactController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Submit a contact form message (public endpoint)
    /// </summary>
    [HttpPost]
    public async Task<ActionResult> SubmitContact([FromBody] CreateContactRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var submission = new ContactSubmission
        {
            Name = request.Name,
            Email = request.Email,
            Subject = request.Subject,
            Message = request.Message,
        };

        _db.ContactSubmissions.Add(submission);

        // Create admin notification
        _db.AdminNotifications.Add(new AdminNotification
        {
            Type = "new_contact",
            Title = $"New Contact Message: {request.Name}",
            Message = request.Subject ?? "No subject",
            LinkUrl = $"/admin/contacts/{submission.Id}",
        });

        await _db.SaveChangesAsync();

        _logger.LogInformation("New contact submission from {Email}", request.Email);

        return Ok(new { message = "Thank you for your message. We'll get back to you within 24 hours." });
    }
}
