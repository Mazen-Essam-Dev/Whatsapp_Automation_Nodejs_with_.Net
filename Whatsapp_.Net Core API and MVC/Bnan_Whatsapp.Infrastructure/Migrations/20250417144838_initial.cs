using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bnan_Whatsapp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bnan_whatsapp_Relationship",
                columns: table => new
                {
                    Bnan_whatsapp_Relationship_Code = table.Column<string>(type: "char(3)", unicode: false, fixedLength: true, maxLength: 3, nullable: false),
                    Bnan_whatsapp_Relationship_ArName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Bnan_whatsapp_Relationship_EnName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Bnan_whatsapp_Relationship_Status = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relationship", x => x.Bnan_whatsapp_Relationship_Code);
                });

            migrationBuilder.CreateTable(
                name: "Bnan_whatsapp_Sender",
                columns: table => new
                {
                    Bnan_whatsapp_Sender_Code = table.Column<string>(type: "char(6)", unicode: false, fixedLength: true, maxLength: 6, nullable: false),
                    Bnan_whatsapp_Sender_ArName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Sender_EnName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Sender_CountryKey = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    Bnan_whatsapp_Sender_Mobile = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Bnan_whatsapp_Sender_Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Sender_Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Sender_Type = table.Column<bool>(type: "bit", nullable: true),
                    Bnan_whatsapp_Sender_Remarks = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Bnan_whatsapp_Sender_Status = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: true),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bnan_whatsapp_Sender", x => x.Bnan_whatsapp_Sender_Code);
                });

            migrationBuilder.CreateTable(
                name: "Bnan_whatsapp_Recive",
                columns: table => new
                {
                    Bnan_whatsapp_Recive_Code = table.Column<string>(type: "char(8)", unicode: false, fixedLength: true, maxLength: 8, nullable: false),
                    Bnan_whatsapp_Recive_ArName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Recive_EnName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bnan_whatsapp_Recive_CountryKey = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    Bnan_whatsapp_Recive_Mobile = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Bnan_whatsapp_Recive_Sender_Id = table.Column<string>(type: "char(6)", unicode: false, fixedLength: true, maxLength: 6, nullable: true),
                    Bnan_whatsapp_Recive_Relationship_Id = table.Column<string>(type: "char(3)", unicode: false, fixedLength: true, maxLength: 3, nullable: true),
                    Bnan_whatsapp_Recive_Remarks = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Bnan_whatsapp_Recive_Status = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reciver", x => x.Bnan_whatsapp_Recive_Code);
                    table.ForeignKey(
                        name: "FK_Recive_Relationship",
                        column: x => x.Bnan_whatsapp_Recive_Relationship_Id,
                        principalTable: "Bnan_whatsapp_Relationship",
                        principalColumn: "Bnan_whatsapp_Relationship_Code");
                    table.ForeignKey(
                        name: "FK_Recive_Sender",
                        column: x => x.Bnan_whatsapp_Recive_Sender_Id,
                        principalTable: "Bnan_whatsapp_Sender",
                        principalColumn: "Bnan_whatsapp_Sender_Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recive_Relationship",
                table: "Bnan_whatsapp_Recive",
                column: "Bnan_whatsapp_Recive_Relationship_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Recive_Sender",
                table: "Bnan_whatsapp_Recive",
                column: "Bnan_whatsapp_Recive_Sender_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bnan_whatsapp_Recive");

            migrationBuilder.DropTable(
                name: "Bnan_whatsapp_Relationship");

            migrationBuilder.DropTable(
                name: "Bnan_whatsapp_Sender");
        }
    }
}
