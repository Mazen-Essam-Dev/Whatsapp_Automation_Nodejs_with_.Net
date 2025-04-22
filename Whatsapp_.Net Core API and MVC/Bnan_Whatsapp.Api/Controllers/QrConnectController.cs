using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class QrConnectController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappSender>  _SenderRepository;
        public QrConnectController(IBaseRepository<BnanWhatsappSender> senderRepository)
        {
            _SenderRepository = senderRepository;
        }
        [HttpGet]
        public IActionResult QrPage()
        {

            return View();
        }
        //public IActionResult QrPage()
        //{
        //    SenderPageVM senderVM = new SenderPageVM();
        //    var list_senders = _SenderRepository.GetAll();
        //    senderVM.all_Senders = list_senders;
        //    return View(senderVM);
        //}
    }
}
