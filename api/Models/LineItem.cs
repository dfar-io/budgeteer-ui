namespace BudgeteerApi.Models;

public class LineItem
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}