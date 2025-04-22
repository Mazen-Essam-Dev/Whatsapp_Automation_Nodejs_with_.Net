using Bnan_Whatsapp.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace Bnan_Whatsapp.Api.ViewModels
{
    public class AddSenderViewModel
    {
        public BnanWhatsappSender_1 Added_Sender { get; set; } = new BnanWhatsappSender_1();
    }

    public class EditSenderViewModel
    {
        public BnanWhatsappSender_2 Edited_Sender { get; set; } = new BnanWhatsappSender_2();
    }
    public class SenderPageVM
    {
        public string? User_id { get; set; }
        public List<BnanWhatsappSender> all_Senders { get; set; } = new List<BnanWhatsappSender>();
        public AddSenderViewModel AddSenderViewModel { get; set; } = new AddSenderViewModel();
        public EditSenderViewModel EditSenderViewModel { get; set; } = new EditSenderViewModel();       
    }

    public partial class BnanWhatsappSender_1
    {
        public string? User_id { get; set; }

        //public string BnanWhatsappSenderCode { get; set; } = null!;

        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? BnanWhatsappSenderArName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? BnanWhatsappSenderEnName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(6, ErrorMessage = "اقصاه 6 حرف")]
        public string? BnanWhatsappSenderCountryKey { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(20, ErrorMessage = "اقصاه 20 حرف")]
        public string? BnanWhatsappSenderMobile { get; set; }

        //public string? BnanWhatsappSenderPassword { get; set; }

        //public bool? BnanWhatsappSenderType { get; set; }

        //public string? BnanWhatsappSenderStatus { get; set; }
    }


    public partial class BnanWhatsappSender_2
    {
        public string? User_id { get; set; }

        public string? BnanWhatsappSenderCode { get; set; }

        //[Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        //public string? BnanWhatsappSenderArName { get; set; }
        //[Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        //public string? BnanWhatsappSenderEnName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(6, ErrorMessage = "اقصاه 6 حرف")]
        public string? BnanWhatsappSenderCountryKey { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(20, ErrorMessage = "اقصاه 20 حرف")]
        public string? BnanWhatsappSenderMobile { get; set; }

        //public string? BnanWhatsappSenderPassword { get; set; }

        //public bool? BnanWhatsappSenderType { get; set; }

        //public string? BnanWhatsappSenderStatus { get; set; }
    }
}
