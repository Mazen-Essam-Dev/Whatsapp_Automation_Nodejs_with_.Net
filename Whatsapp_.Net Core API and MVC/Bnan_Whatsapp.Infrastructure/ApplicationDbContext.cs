using System;
using System.Collections.Generic;
using Bnan_Whatsapp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bnan_Whatsapp.Infrastructure;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BnanWhatsappRecive> BnanWhatsappRecives { get; set; }

    public virtual DbSet<BnanWhatsappRelationship> BnanWhatsappRelationships { get; set; }

    public virtual DbSet<BnanWhatsappSender> BnanWhatsappSenders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server=.;database=Bnan_whatsapp;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BnanWhatsappRecive>(entity =>
        {
            entity.HasKey(e => e.BnanWhatsappReciveCode).HasName("PK_Reciver");

            entity.ToTable("Bnan_whatsapp_Recive");

            entity.HasIndex(e => e.BnanWhatsappReciveRelationshipId, "IX_Recive_Relationship");

            entity.HasIndex(e => e.BnanWhatsappReciveSenderId, "IX_Recive_Sender");

            entity.Property(e => e.BnanWhatsappReciveCode)
                .HasMaxLength(8)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Recive_Code");
            entity.Property(e => e.BnanWhatsappReciveArName)
                .HasMaxLength(50)
                .HasColumnName("Bnan_whatsapp_Recive_ArName");
            entity.Property(e => e.BnanWhatsappReciveCountryKey)
                .HasMaxLength(6)
                .HasColumnName("Bnan_whatsapp_Recive_CountryKey");
            entity.Property(e => e.BnanWhatsappReciveEnName)
                .HasMaxLength(50)
                .HasColumnName("Bnan_whatsapp_Recive_EnName");
            entity.Property(e => e.BnanWhatsappReciveMobile)
                .HasMaxLength(20)
                .HasColumnName("Bnan_whatsapp_Recive_Mobile");
            entity.Property(e => e.BnanWhatsappReciveRelationshipId)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Recive_Relationship_Id");
            entity.Property(e => e.BnanWhatsappReciveSenderId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Recive_Sender_Id");
            entity.Property(e => e.BnanWhatsappReciveStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Recive_Status");

            entity.HasOne(d => d.BnanWhatsappReciveRelationship).WithMany(p => p.BnanWhatsappRecives)
                .HasForeignKey(d => d.BnanWhatsappReciveRelationshipId)
                .HasConstraintName("FK_Recive_Relationship");

            entity.HasOne(d => d.BnanWhatsappReciveSender).WithMany(p => p.BnanWhatsappRecives)
                .HasForeignKey(d => d.BnanWhatsappReciveSenderId)
                .HasConstraintName("FK_Recive_Sender");
        });

        modelBuilder.Entity<BnanWhatsappRelationship>(entity =>
        {
            entity.HasKey(e => e.BnanWhatsappRelationshipCode).HasName("PK_Relationship");

            entity.ToTable("Bnan_whatsapp_Relationship");

            entity.Property(e => e.BnanWhatsappRelationshipCode)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Relationship_Code");
            entity.Property(e => e.BnanWhatsappRelationshipArName)
                .HasMaxLength(100)
                .HasColumnName("Bnan_whatsapp_Relationship_ArName");
            entity.Property(e => e.BnanWhatsappRelationshipEnName)
                .HasMaxLength(100)
                .HasColumnName("Bnan_whatsapp_Relationship_EnName");
            entity.Property(e => e.BnanWhatsappRelationshipStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Relationship_Status");
        });

        modelBuilder.Entity<BnanWhatsappSender>(entity =>
        {
            entity.HasKey(e => e.BnanWhatsappSenderCode);

            entity.ToTable("Bnan_whatsapp_Sender");

            entity.Property(e => e.BnanWhatsappSenderCode)
                .HasMaxLength(6)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Sender_Code");
            entity.Property(e => e.BnanWhatsappSenderArName)
                .HasMaxLength(50)
                .HasColumnName("Bnan_whatsapp_Sender_ArName");
            entity.Property(e => e.BnanWhatsappSenderCountryKey)
                .HasMaxLength(6)
                .HasColumnName("Bnan_whatsapp_Sender_CountryKey");
            entity.Property(e => e.BnanWhatsappSenderEnName)
                .HasMaxLength(50)
                .HasColumnName("Bnan_whatsapp_Sender_EnName");
            entity.Property(e => e.BnanWhatsappSenderMobile)
                .HasMaxLength(20)
                .HasColumnName("Bnan_whatsapp_Sender_Mobile");
            entity.Property(e => e.BnanWhatsappSenderPassword)
                .HasMaxLength(50)
                .HasColumnName("Bnan_whatsapp_Sender_Password");
            entity.Property(e => e.BnanWhatsappSenderStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Bnan_whatsapp_Sender_Status");
            entity.Property(e => e.BnanWhatsappSenderType).HasColumnName("Bnan_whatsapp_Sender_Type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
