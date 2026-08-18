using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AchariTours.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin_notifications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    message = table.Column<string>(type: "text", nullable: true),
                    link_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    is_read = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin_notifications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "booking_inquiries",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    reference_code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    tour_id = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    tour_title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    preferred_start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    preferred_end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    adult_count = table.Column<int>(type: "integer", nullable: false),
                    child_count = table.Column<int>(type: "integer", nullable: false),
                    selected_addons = table.Column<List<string>>(type: "jsonb", nullable: false),
                    special_requests = table.Column<string>(type: "text", nullable: true),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    last_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    phone = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    internal_notes = table.Column<string>(type: "text", nullable: true),
                    utm_source = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    utm_medium = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    utm_campaign = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    referrer_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booking_inquiries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contact_submissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    subject = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    message = table.Column<string>(type: "text", nullable: false),
                    is_read = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contact_submissions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "newsletter_subscribers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    source = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    utm_source = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    subscribed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    unsubscribed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_newsletter_subscribers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "inquiry_status_history",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    inquiry_id = table.Column<Guid>(type: "uuid", nullable: false),
                    old_status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    new_status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    changed_by = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    note = table.Column<string>(type: "text", nullable: true),
                    changed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inquiry_status_history", x => x.id);
                    table.ForeignKey(
                        name: "FK_inquiry_status_history_booking_inquiries_inquiry_id",
                        column: x => x.inquiry_id,
                        principalTable: "booking_inquiries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_admin_notifications_created_at",
                table: "admin_notifications",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "IX_admin_notifications_is_read",
                table: "admin_notifications",
                column: "is_read");

            migrationBuilder.CreateIndex(
                name: "IX_booking_inquiries_created_at",
                table: "booking_inquiries",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "IX_booking_inquiries_email",
                table: "booking_inquiries",
                column: "email");

            migrationBuilder.CreateIndex(
                name: "IX_booking_inquiries_reference_code",
                table: "booking_inquiries",
                column: "reference_code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_booking_inquiries_status",
                table: "booking_inquiries",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_contact_submissions_created_at",
                table: "contact_submissions",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "IX_inquiry_status_history_inquiry_id",
                table: "inquiry_status_history",
                column: "inquiry_id");

            migrationBuilder.CreateIndex(
                name: "IX_newsletter_subscribers_email",
                table: "newsletter_subscribers",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin_notifications");

            migrationBuilder.DropTable(
                name: "contact_submissions");

            migrationBuilder.DropTable(
                name: "inquiry_status_history");

            migrationBuilder.DropTable(
                name: "newsletter_subscribers");

            migrationBuilder.DropTable(
                name: "booking_inquiries");
        }
    }
}
