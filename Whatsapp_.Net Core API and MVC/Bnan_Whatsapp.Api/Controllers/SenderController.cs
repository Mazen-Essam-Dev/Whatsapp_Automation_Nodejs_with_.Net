using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Microsoft.AspNetCore.Mvc;


namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class SenderController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappSender>  _SenderRepository;
        public SenderController(IBaseRepository<BnanWhatsappSender> senderRepository)
        {
            _SenderRepository = senderRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var User_id = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");

            ViewBag.User = User_id;

            SenderPageVM senderVM = new SenderPageVM();
            senderVM.User_id = User_id;

            var ExistSender = await _SenderRepository.GetByIdAsync(User_id);
            if (ExistSender != null)
            {
                if (ExistSender.BnanWhatsappSenderType == false)
                {
                    ViewBag.Connect_status = "مقترن";
                    ViewBag.typeUser = "N";
                }
                else {
                    ViewBag.typeUser = "S";
                    ViewBag.Connect_status = "";
                }
                ViewBag.Name = ExistSender.BnanWhatsappSenderArName;
                ViewBag.Mobile = ExistSender.BnanWhatsappSenderCountryKey+ ExistSender.BnanWhatsappSenderMobile;
                if (ExistSender.BnanWhatsappSenderType == true)
                {
                    var list_senders = _SenderRepository.FindAll(x => x.BnanWhatsappSenderType == false);
                    senderVM.all_Senders = list_senders;
                    return View(senderVM);
                }
                else 
                {
                    return RedirectToAction("AddRecive", "Recive", new { id = senderVM.User_id });
                }
            }
            //return NotFound("غير موجودة");
            return RedirectToAction("LoginPage", "Login");
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddSender(AddSenderViewModel senderVM)
        {
            var newSender = new BnanWhatsappSender();
            if (ModelState.IsValid)
            {
                try
                {
                    newSender.BnanWhatsappSenderArName = senderVM.Added_Sender.BnanWhatsappSenderArName;
                    newSender.BnanWhatsappSenderEnName = senderVM.Added_Sender.BnanWhatsappSenderEnName;
                    newSender.BnanWhatsappSenderMobile = senderVM.Added_Sender.BnanWhatsappSenderMobile;
                    newSender.BnanWhatsappSenderCountryKey = senderVM.Added_Sender.BnanWhatsappSenderCountryKey;

                    newSender.BnanWhatsappSenderCode = await GetlastCodeAsync();
                    newSender.BnanWhatsappSenderPassword = newSender.BnanWhatsappSenderCode;
                    newSender.BnanWhatsappSenderType = false;
                    newSender.BnanWhatsappSenderStatus = "A";

                    _SenderRepository.Add(newSender);
                    if (await _SenderRepository.CompleteAsync() > 0)
                    {
                        return RedirectToAction("Index", "Sender", new { id = senderVM.Added_Sender.User_id });
                    }
                }
                catch (Exception ex)
                {
                    return RedirectToAction("Index", "Sender", new { id = senderVM.Added_Sender.User_id });
                }
            }
            return RedirectToAction("Index", "Sender", new { id = senderVM.Added_Sender.User_id });
        }


        [HttpPost("Edit")]
        public async Task<string> EditSender(EditSenderViewModel senderVM)
        {
            var newSender = new BnanWhatsappSender();
            if (ModelState.IsValid)
            {
                try
                {
                    var ExistSender = await _SenderRepository.GetByIdAsync(senderVM.Edited_Sender.BnanWhatsappSenderCode);
                    if (ExistSender != null)
                    {
                        ExistSender.BnanWhatsappSenderMobile = senderVM.Edited_Sender.BnanWhatsappSenderMobile;
                        ExistSender.BnanWhatsappSenderCountryKey = senderVM.Edited_Sender.BnanWhatsappSenderCountryKey;

                        //newSender.BnanWhatsappSenderPassword = newSender.BnanWhatsappSenderCode;
                        //newSender.BnanWhatsappSenderType = false;
                        //newSender.BnanWhatsappSenderStatus = "A";

                        _SenderRepository.Update(ExistSender);
                        if (await _SenderRepository.CompleteAsync() > 0)
                        {
                            return "Done";
                        }
                    }
                }
                catch (Exception ex)
                {
                    return "Done";
                }
            }
            return "Done";
        }

        [HttpPost("DeleteSender")]
        public async Task<IActionResult> DeleteSender(string? itemId)
        {
            var ExistSender = await _SenderRepository.GetByIdAsync(itemId);

            try
            {
                if (ExistSender != null)
                {
                    if (ExistSender.BnanWhatsappSenderStatus == "A")
                    {
                        ExistSender.BnanWhatsappSenderStatus = "D";

                    }
                    else
                    {
                        ExistSender.BnanWhatsappSenderStatus = "A";
                    }

                    _SenderRepository.Update(ExistSender);
                    if (await _SenderRepository.CompleteAsync() > 0)
                    {
                        return RedirectToAction("Index", "Sender");
                    }
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index", "Sender");
            }

            return RedirectToAction("Index", "Sender");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<string> GetlastCodeAsync()
        {
            var year = DateTime.Now.ToString("yy");
            var lastSerial = "";
            var all = await _SenderRepository.GetAllAsync();
            var last = all?.LastOrDefault();
            if(last != null)
            {
                var year2 = last.BnanWhatsappSenderCode.Substring(0, 2);
                var reminder = last.BnanWhatsappSenderCode.Substring(2, 4);

                if (year2 == year)
                {
                    lastSerial = year + (Convert.ToInt16(reminder)+1).ToString("0000");
                }
                else
                {
                    lastSerial = year + "0001";
                }
            }
            return lastSerial;
        }

    }
}
