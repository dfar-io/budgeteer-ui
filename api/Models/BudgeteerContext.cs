using Microsoft.EntityFrameworkCore;

namespace BudgeteerApi.Models;

public class BudgeteerContext(DbContextOptions<BudgeteerContext> options) : DbContext(options)
{
  public DbSet<LineItem> LineItems { get; set; } = null!;
}