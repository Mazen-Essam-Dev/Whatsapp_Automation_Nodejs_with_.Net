using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappSender>  _SenderRepository;
        //private readonly UserManager<BnanWhatsappSender> _userManager;
        //private readonly SignInManager<BnanWhatsappSender> _SignInManager;
        public LoginController(IBaseRepository<BnanWhatsappSender> senderRepository /*, SignInManager<BnanWhatsappSender> signInManager, UserManager<BnanWhatsappSender> userManager*/)
        {
            _SenderRepository = senderRepository;
            //_SignInManager = signInManager;
            //_userManager = userManager;
        }

        [HttpGet]
        public IActionResult LoginPage()
        {
            // افراغ قيمة السيشن وكوكز
            HttpContext.Session.SetString("UserId", "");
            return View();
        }

        //[HttpPost]
        //public IActionResult LoginPage(Sender_UserVM sender_UserVM)
        //{
        //    return RedirectToAction("Login");
        //}

        [HttpPost]
        //public async Task<IActionResult> Register(RegisterViewModel model)
        public async Task<IActionResult> LoginPage(Sender_UserVM sender_UserVM)
        {
            if (!ModelState.IsValid) { 
                sender_UserVM.statusError_pass = "ادخل باق البيانات من فضلك";
                return View(sender_UserVM); 
            }

            var SenderExist = await _SenderRepository.GetByIdAsync(sender_UserVM.BnanWhatsappSenderCode);
            if (SenderExist != null)
            {
                if (sender_UserVM.BnanWhatsappSenderPassword == SenderExist.BnanWhatsappSenderPassword)
                {
                    // فرضًا تحققنا من المستخدم ونجح تسجيل الدخول
                    HttpContext.Session.SetString("UserId", sender_UserVM.BnanWhatsappSenderCode);

                    //return RedirectToAction("Index", "Sender", new { id = sender_UserVM.BnanWhatsappSenderCode });
                    return RedirectToAction("Index", "Home");

                }
            }
            //return RedirectToAction("LoginPage");
            sender_UserVM.statusError_pass = "الرمز او الباسورد خطأ";
            return View(sender_UserVM);

            //var user = new BnanWhatsappSender
            //{
            //    UserName = sender_UserVM.BnanWhatsappSenderCode,
            //    PhoneNumber = sender_UserVM.BnanWhatsappSenderCode
            //};

            //var result = await _userManager.CreateAsync(user, sender_UserVM.Password);

            //if (result.Succeeded)
            //{
            //    await _signInManager.SignInAsync(user, isPersistent: false);
            //    return RedirectToAction("Index", "Home");
            //}

            //foreach (var error in result.Errors)
            //{
            //    ModelState.AddModelError("", error.Description);
            //}

            return View(sender_UserVM);
        }

    }
}
