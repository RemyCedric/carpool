namespace Covoiturage.Domain.Entities;

public class Event : AuditableEntity
{
    public int Id { get; set; }

    public String Nom { get; set; } = "";

    public DateTime Date { get; set; }

    public Photo? Photo { get; set; }
}
