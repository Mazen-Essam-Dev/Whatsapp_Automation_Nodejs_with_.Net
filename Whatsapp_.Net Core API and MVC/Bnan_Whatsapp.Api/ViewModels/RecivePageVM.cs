using Bnan_Whatsapp.Core.Models;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using System.ComponentModel.DataAnnotations;

namespace Bnan_Whatsapp.Api.ViewModels
{
    public class RecivePageVM
    {
        public string User_id { get; set; }
        public List<BnanWhatsappRecive> all_Recives { get; set; } = new List<BnanWhatsappRecive>();
        public AddReciverViewModel AddReciveViewModel { get; set; } = new AddReciverViewModel();
        public EditReciverViewModel EditReciveViewModel { get; set; } = new EditReciverViewModel();
    }


    public class AddReciverViewModel
    {
        public string User_id { get; set; }
        public BnanWhatsappRecive_1 Added_Reciver { get; set; } = new BnanWhatsappRecive_1();
        public List<BnanWhatsappRelationship> all_Relationship { get; set; } = new List<BnanWhatsappRelationship>();

    }

    public class EditReciverViewModel
    {
        public string User_id { get; set; }
        public BnanWhatsappRecive_2 Edited_Reciver { get; set; } = new BnanWhatsappRecive_2();
    }


    public partial class BnanWhatsappRecive_1
    {
            
        public string? BnanWhatsappReciveCode { get; set; }

        [Required(ErrorMessage = "الحقل مطلوب"),MaxLength(50,ErrorMessage ="اقصاه 50 حرف")]
        public string? BnanWhatsappReciveArName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? BnanWhatsappReciveEnName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(6, ErrorMessage = "اقصاه 6 رقم")]
        public string? BnanWhatsappReciveCountryKey { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(20, ErrorMessage = "اقصاه 20 رقم")]
        public string? BnanWhatsappReciveMobile { get; set; }

        //public string? BnanWhatsappReciveSenderId { get; set; }

        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(3, ErrorMessage = "اقصاه 3 رقم")]
        public string? BnanWhatsappReciveRelationshipId { get; set; }

        //public string? BnanWhatsappReciveStatus { get; set; }

    }
    public partial class BnanWhatsappRecive_2
    {

        public string? BnanWhatsappReciveCode { get; set; }

        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? BnanWhatsappReciveArName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(50, ErrorMessage = "اقصاه 50 حرف")]
        public string? BnanWhatsappReciveEnName { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(6, ErrorMessage = "اقصاه 6 رقم")]
        public string? BnanWhatsappReciveCountryKey { get; set; }
        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(20, ErrorMessage = "اقصاه 20 رقم")]
        public string? BnanWhatsappReciveMobile { get; set; }

        //public string? BnanWhatsappReciveSenderId { get; set; }

        [Required(ErrorMessage = "الحقل مطلوب"), MaxLength(3, ErrorMessage = "اقصاه 3 رقم")]
        public string? BnanWhatsappReciveRelationshipId { get; set; }

        //public string? BnanWhatsappReciveStatus { get; set; }

    }


}
