using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappSender> _senderRepository;
        public HomeController(IBaseRepository<BnanWhatsappSender> senderRepository)
        {
            _senderRepository = senderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var User_id = HttpContext.Session.GetString("UserId");
            var ExistSender = await _senderRepository.GetByIdAsync(User_id);

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");
            ViewBag.User = User_id;
            if (ExistSender.BnanWhatsappSenderType == false)
            {
                ViewBag.Connect_status = "مقترن";
                ViewBag.typeUser = "N";
            }
            else { ViewBag.typeUser = "S"; }

            ViewBag.Name = ExistSender.BnanWhatsappSenderArName;
            ViewBag.Mobile = ExistSender.BnanWhatsappSenderCountryKey + ExistSender.BnanWhatsappSenderMobile;
            // افراغ قيمة السيشن وكوكز
            return View();
        }

    }
}
