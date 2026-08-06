using Microsoft.EntityFrameworkCore;
using AchariTours.Api.Models.Entities;

namespace AchariTours.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<BookingInquiry> BookingInquiries => Set<BookingInquiry>();
    public DbSet<InquiryStatusHistory> InquiryStatusHistory => Set<InquiryStatusHistory>();
    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();
    public DbSet<NewsletterSubscriber> NewsletterSubscribers => Set<NewsletterSubscriber>();
    public DbSet<AdminNotification> AdminNotifications => Set<AdminNotification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // BookingInquiry
        modelBuilder.Entity<BookingInquiry>(entity =>
        {
            entity.HasIndex(e => e.ReferenceCode).IsUnique();
            entity.HasIndex(e => e.Email);
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.CreatedAt);

            entity.Property(e => e.Status)
                  .HasConversion<string>()
                  .HasMaxLength(20);

            entity.Property(e => e.SelectedAddons)
                  .HasColumnType("jsonb");
        });

        // InquiryStatusHistory
        modelBuilder.Entity<InquiryStatusHistory>(entity =>
        {
            entity.HasIndex(e => e.InquiryId);

            entity.Property(e => e.OldStatus)
                  .HasConversion<string>()
                  .HasMaxLength(20);

            entity.Property(e => e.NewStatus)
                  .HasConversion<string>()
                  .HasMaxLength(20);

            entity.HasOne(e => e.Inquiry)
                  .WithMany(i => i.StatusHistory)
                  .HasForeignKey(e => e.InquiryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // NewsletterSubscriber
        modelBuilder.Entity<NewsletterSubscriber>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // ContactSubmission
        modelBuilder.Entity<ContactSubmission>(entity =>
        {
            entity.HasIndex(e => e.CreatedAt);
        });

        // AdminNotification
        modelBuilder.Entity<AdminNotification>(entity =>
        {
            entity.HasIndex(e => e.IsRead);
            entity.HasIndex(e => e.CreatedAt);
        });
    }
}
