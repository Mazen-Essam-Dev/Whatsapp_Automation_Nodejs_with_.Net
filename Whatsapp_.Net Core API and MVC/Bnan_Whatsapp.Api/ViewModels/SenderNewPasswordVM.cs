using Bnan_Whatsapp.Core.Models;
using DocumentFormat.OpenXml.Wordprocessing;
using System.ComponentModel.DataAnnotations;

namespace Bnan_Whatsapp.Api.ViewModels
{
    public class SenderNewPasswordVM
    {
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(6, ErrorMessage = "اقصاه 6 حرف")]
        public string? User_id { get; set; }
        public string? User_old_pass { get; set; }
        

        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? old_password { get; set; }
        public string? new_password_1 { get; set; }
        public string? new_password_2 { get; set; }


    }
}
