using System;
using System.Collections.Generic;

namespace Bnan_Whatsapp.Core.Models;

public partial class BnanWhatsappRecive
{
    public string BnanWhatsappReciveCode { get; set; } = null!;

    public string? BnanWhatsappReciveArName { get; set; }

    public string? BnanWhatsappReciveEnName { get; set; }

    public string? BnanWhatsappReciveCountryKey { get; set; }

    public string? BnanWhatsappReciveMobile { get; set; }

    public string? BnanWhatsappReciveSenderId { get; set; }

    public string? BnanWhatsappReciveRelationshipId { get; set; }

    public string? BnanWhatsappReciveStatus { get; set; }

    public virtual BnanWhatsappRelationship? BnanWhatsappReciveRelationship { get; set; }

    public virtual BnanWhatsappSender? BnanWhatsappReciveSender { get; set; }
}
