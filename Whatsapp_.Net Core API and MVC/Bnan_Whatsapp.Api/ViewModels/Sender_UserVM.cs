using Bnan_Whatsapp.Core.Models;
using DocumentFormat.OpenXml.Wordprocessing;
using System.ComponentModel.DataAnnotations;

namespace Bnan_Whatsapp.Api.ViewModels
{
    public class Sender_UserVM
    {
        [Required(ErrorMessage = "الرمز مطلوب")]
        [Display(Name = "ادخل الرمز")]
        public string BnanWhatsappSenderCode { get; set; } = null!;

        public string statusError_pass { get; set; } = " ";
        public string? BnanWhatsappSenderArName { get; set; }

        public string? BnanWhatsappSenderEnName { get; set; }

        public string? BnanWhatsappSenderCountryKey { get; set; }

        public string? BnanWhatsappSenderMobile { get; set; }

        public string? BnanWhatsappSenderEmail { get; set; }
        [Required(ErrorMessage = "كلمة المرور مطلوبة")]
        [Display(Name = "كلمة المرور")]
        public string? BnanWhatsappSenderPassword { get; set; }

        public bool? BnanWhatsappSenderType { get; set; }

        public string? BnanWhatsappSenderRemarks { get; set; }

        public string? BnanWhatsappSenderStatus { get; set; }
    }
}
