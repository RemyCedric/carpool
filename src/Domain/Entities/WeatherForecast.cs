using System;
using Domain.Common;

namespace Domain.Entities
{
    public class WeatherForecast : AuditableEntity
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF { get; set; }

        public string Summary { get; set; }
    }
}
