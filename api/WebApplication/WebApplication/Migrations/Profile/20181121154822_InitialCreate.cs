﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations.Profile
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Profile",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    First_Name = table.Column<string>(nullable: true),
                    Last_Name = table.Column<string>(nullable: true),
                    Discription = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Uploaded = table.Column<string>(nullable: true),
                    Width = table.Column<string>(nullable: true),
                    Height = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profile", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Profile");
        }
    }
}
