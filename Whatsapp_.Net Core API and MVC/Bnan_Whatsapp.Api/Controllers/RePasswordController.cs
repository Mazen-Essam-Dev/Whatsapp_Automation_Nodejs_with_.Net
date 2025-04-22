using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class RePasswordController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappSender> _senderRepository;
        public RePasswordController(IBaseRepository<BnanWhatsappSender> senderRepository)
        {
            _senderRepository = senderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> NewPassword()
        {
            var User_id = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");

            ViewBag.User = User_id;

            SenderNewPasswordVM senderRePassVM = new SenderNewPasswordVM();
            senderRePassVM.User_id = User_id;

            var ExistSender = await _senderRepository.GetByIdAsync(User_id);
            if (ExistSender != null)
            {
                if (ExistSender.BnanWhatsappSenderType == false)
                {
                    ViewBag.Connect_status = "مقترن";
                    ViewBag.typeUser = "N";
                }
                else { ViewBag.typeUser = "S"; }
                ViewBag.Name = ExistSender.BnanWhatsappSenderArName;
                ViewBag.Mobile = ExistSender.BnanWhatsappSenderCountryKey + ExistSender.BnanWhatsappSenderMobile;

                senderRePassVM.User_old_pass = ExistSender.BnanWhatsappSenderPassword;
                return View(senderRePassVM);
            }
            //return NotFound("غير موجودة");
            return RedirectToAction("LoginPage", "Login");
        }

        [HttpPost]
        public async Task<IActionResult> NewPassword(SenderNewPasswordVM senderRePassVM)
        {
            var User_id = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");

            var ExistSender = await _senderRepository.GetByIdAsync(User_id);

            if (ModelState.IsValid)
            {
                try
                {
                    if(ExistSender != null)
                    {
                        if (senderRePassVM.new_password_1 == senderRePassVM.new_password_2 && senderRePassVM.old_password == ExistSender.BnanWhatsappSenderPassword)
                        {
                            ExistSender.BnanWhatsappSenderPassword = senderRePassVM.new_password_2;
                            _senderRepository.Update(ExistSender);
                            if (await _senderRepository.CompleteAsync() > 0)
                            {
                                return RedirectToAction("NewPassword", "RePassword", new { id = senderRePassVM.User_id });
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    return View(senderRePassVM);
                }
            }
            return View(senderRePassVM);
        }



    }
}
