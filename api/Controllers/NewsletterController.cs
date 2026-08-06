using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AchariTours.Api.Data;
using AchariTours.Api.Models.DTOs;
using AchariTours.Api.Models.Entities;

namespace AchariTours.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<NewsletterController> _logger;

    public NewsletterController(AppDbContext db, ILogger<NewsletterController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Subscribe to the newsletter (public endpoint)
    /// </summary>
    [HttpPost("subscribe")]
    public async Task<ActionResult> Subscribe([FromBody] NewsletterSubscribeRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Check if already subscribed
        var existing = await _db.NewsletterSubscribers
            .FirstOrDefaultAsync(s => s.Email == request.Email);

        if (existing != null)
        {
            if (existing.IsActive)
                return Ok(new { message = "You're already subscribed! Thank you." });

            // Re-subscribe
            existing.IsActive = true;
            existing.UnsubscribedAt = null;
            existing.SubscribedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { message = "Welcome back! You've been re-subscribed." });
        }

        _db.NewsletterSubscribers.Add(new NewsletterSubscriber
        {
            Email = request.Email,
            Source = request.Source,
            UtmSource = request.UtmSource,
        });

        await _db.SaveChangesAsync();

        _logger.LogInformation("New newsletter subscriber: {Email}", request.Email);

        return Ok(new { message = "Welcome to the Achari Tours Travel Insider! Check your inbox for a confirmation." });
    }
}
