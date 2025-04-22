using System;
using System.Collections.Generic;

namespace Bnan_Whatsapp.Core.Models;

public partial class BnanWhatsappRelationship
{
    public string BnanWhatsappRelationshipCode { get; set; } = null!;

    public string? BnanWhatsappRelationshipArName { get; set; }

    public string? BnanWhatsappRelationshipEnName { get; set; }

    public string? BnanWhatsappRelationshipStatus { get; set; }

    public virtual ICollection<BnanWhatsappRecive> BnanWhatsappRecives { get; set; } = new List<BnanWhatsappRecive>();
}
