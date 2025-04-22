using System;
using System.Collections.Generic;

namespace Bnan_Whatsapp.Core.Models;

public partial class BnanWhatsappSender
{
    public string BnanWhatsappSenderCode { get; set; } = null!;

    public string? BnanWhatsappSenderArName { get; set; }

    public string? BnanWhatsappSenderEnName { get; set; }

    public string? BnanWhatsappSenderCountryKey { get; set; }

    public string? BnanWhatsappSenderMobile { get; set; }

    public string? BnanWhatsappSenderPassword { get; set; }

    public bool? BnanWhatsappSenderType { get; set; }

    public string? BnanWhatsappSenderStatus { get; set; }

    public virtual ICollection<BnanWhatsappRecive> BnanWhatsappRecives { get; set; } = new List<BnanWhatsappRecive>();
}
