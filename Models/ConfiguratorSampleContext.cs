using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MyWebApp.Models
{
    public partial class ConfiguratorSampleContext : DbContext
    {
        public ConfiguratorSampleContext()
        {
        }

        public ConfiguratorSampleContext(DbContextOptions<ConfiguratorSampleContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DisallowedParameter> DisallowedParameter { get; set; }
        public virtual DbSet<DisallowedRule> DisallowedRule { get; set; }
        public virtual DbSet<DisallowedValue> DisallowedValue { get; set; }
        public virtual DbSet<Parameter> Parameter { get; set; }
        public virtual DbSet<ParameterValue> ParameterValue { get; set; }
        public virtual DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS01;Database=ConfiguratorSample;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DisallowedParameter>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("DISALLOWED_PARAMETER");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DisallowedRuleId).HasColumnName("DISALLOWED_RULE_ID");

                entity.Property(e => e.ParameterId).HasColumnName("PARAMETER_ID");
            });

            modelBuilder.Entity<DisallowedRule>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("DISALLOWED_RULE");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DisallowedValue>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("DISALLOWED_VALUE");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DisallowedParameterId).HasColumnName("DISALLOWED_PARAMETER_ID");

                entity.Property(e => e.ParameterValueId).HasColumnName("PARAMETER_VALUE_ID");
            });

            modelBuilder.Entity<Parameter>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("PARAMETER");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("PRODUCT_ID");
            });

            modelBuilder.Entity<ParameterValue>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("PARAMETER_VALUE");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ParameterId).HasColumnName("PARAMETER_ID");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("PRODUCT");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("OBJECT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50);
            });
        }
    }
}
