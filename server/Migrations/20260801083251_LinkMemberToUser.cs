using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IronGyms.Api.Migrations
{
    /// <inheritdoc />
    public partial class LinkMemberToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Fullname",
                table: "Members");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Members",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Members",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinedAt",
                table: "Members",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Members",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Members_UserId",
                table: "Members",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Users_UserId",
                table: "Members",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Users_UserId",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_UserId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "JoinedAt",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Members");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Members",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fullname",
                table: "Members",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
