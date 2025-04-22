using Bnan_Whatsapp.Api.ViewModels;
using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("[controller]")]
    public class ReciveController : Controller
    {
        private readonly IBaseRepository<BnanWhatsappRecive> _reciveRepository;
        private readonly IBaseRepository<BnanWhatsappSender> _senderRepository;
        private readonly IBaseRepository<BnanWhatsappRelationship> _relationshipRepository;
        public ReciveController(IBaseRepository<BnanWhatsappRecive> reciveRepository, IBaseRepository<BnanWhatsappSender> senderRepository, IBaseRepository<BnanWhatsappRelationship> relationshipRepository)
        {
            _reciveRepository = reciveRepository;
            _senderRepository = senderRepository;
            _relationshipRepository = relationshipRepository;
        }

        [HttpGet("Index")]
        public async Task<IActionResult> Index()
        {
            var User_id = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");

            ViewBag.User = User_id;

            RecivePageVM reciveVM = new RecivePageVM();
            reciveVM.User_id = User_id;

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
                if (ExistSender.BnanWhatsappSenderType == false)
                {
                    var list_recives = _reciveRepository.FindAll(x => x.BnanWhatsappReciveSenderId == User_id);
                    reciveVM.all_Recives = list_recives;
                    return View(reciveVM);
                }
                else
                {
                    return RedirectToAction("AddRecive", "Recive", new { id = reciveVM.User_id });
                }
            }
            //return NotFound("غير موجودة");
            return RedirectToAction("LoginPage", "Login");
        }

        // <summary>
        /////


        //[HttpPost("EditReciver")]
        //public async Task<string> EditReciver(EditSenderViewModel reciveVM)
        //{
        //    var newSender = new BnanWhatsappSender();
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var ExistSender = await _SenderRepository.GetByIdAsync(reciveVM.Edited_Sender.BnanWhatsappSenderCode);
        //            if (ExistSender != null)
        //            {
        //                ExistSender.BnanWhatsappSenderMobile = reciveVM.Edited_Sender.BnanWhatsappSenderMobile;
        //                ExistSender.BnanWhatsappSenderCountryKey = reciveVM.Edited_Sender.BnanWhatsappSenderCountryKey;

        //                //newSender.BnanWhatsappSenderPassword = newSender.BnanWhatsappSenderCode;
        //                //newSender.BnanWhatsappSenderType = false;
        //                //newSender.BnanWhatsappSenderStatus = "A";

        //                _SenderRepository.Update(ExistSender);
        //                if (await _SenderRepository.CompleteAsync() > 0)
        //                {
        //                    return "Done";
        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            return "Done";
        //        }
        //    }
        //    return "Done";
        //}

        [HttpPost("DeleteRecive")]
        public async Task<IActionResult> DeleteRecive(string? itemId)
        {
            var ExistRecive = await _reciveRepository.GetByIdAsync(itemId);

            try
            {
                if (ExistRecive != null)
                {
                    if (ExistRecive.BnanWhatsappReciveStatus == "A")
                    {
                        ExistRecive.BnanWhatsappReciveStatus = "D";

                    }
                    else
                    {
                        ExistRecive.BnanWhatsappReciveStatus = "A";
                    }

                    _reciveRepository.Update(ExistRecive);
                    if (await _reciveRepository.CompleteAsync() > 0)
                    {
                        return RedirectToAction("Index", "Recive");
                    }
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index", "Recive");
            }

            return RedirectToAction("Index", "Recive");
        }
        // </summary>
        // <returns></returns>

        [HttpGet("AddRecive")]
        public async Task<IActionResult> AddRecive()
        {
            var User_id = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(User_id))
                return RedirectToAction("LoginPage", "Login");

            ViewBag.User = User_id;

            AddReciverViewModel ReciveVM = new AddReciverViewModel();
            ReciveVM.User_id = User_id;

            var ExistSender = await _senderRepository.GetByIdAsync(User_id);
            if (ExistSender != null)
            {
                ViewBag.Connect_status = "مقترن";
                ViewBag.Name = ExistSender.BnanWhatsappSenderArName;
                ViewBag.Mobile = ExistSender.BnanWhatsappSenderCountryKey + ExistSender.BnanWhatsappSenderMobile;
                var all_relationships = await _relationshipRepository.FindAllAsync(x => x.BnanWhatsappRelationshipStatus == "A");
                ReciveVM.all_Relationship = all_relationships;
                return View(ReciveVM);
            }
            //return NotFound("غير موجودة");
            return RedirectToAction("LoginPage", "Login");
        }

        [HttpPost("AddRecive")]
        public async Task<IActionResult> AddRecive(AddReciverViewModel ReciveVM)
        {
            var all_relationships = await _relationshipRepository.FindAllAsync(x => x.BnanWhatsappRelationshipStatus == "A");

            var newRecive = new BnanWhatsappRecive();
            if (ModelState.IsValid)
            {
                try
                {
                    newRecive.BnanWhatsappReciveArName = ReciveVM.Added_Reciver.BnanWhatsappReciveArName;
                    newRecive.BnanWhatsappReciveEnName = ReciveVM.Added_Reciver.BnanWhatsappReciveEnName;
                    newRecive.BnanWhatsappReciveCountryKey = ReciveVM.Added_Reciver.BnanWhatsappReciveCountryKey;
                    newRecive.BnanWhatsappReciveMobile = ReciveVM.Added_Reciver.BnanWhatsappReciveMobile;
                    newRecive.BnanWhatsappReciveRelationshipId = ReciveVM.Added_Reciver.BnanWhatsappReciveRelationshipId;

                    newRecive.BnanWhatsappReciveCode = await GetlastCodeAsync();
                    newRecive.BnanWhatsappReciveSenderId = ReciveVM.User_id;
                    newRecive.BnanWhatsappReciveStatus = "A";

                    _reciveRepository.Add(newRecive);
                    if (await _reciveRepository.CompleteAsync() > 0)
                    {
                        return RedirectToAction("Index", "Recive");
                    }
                }
                catch (Exception ex)
                {
                    ReciveVM.all_Relationship = all_relationships;
                    return View(ReciveVM);
                }
            }
            ReciveVM.all_Relationship = all_relationships;
            return View(ReciveVM);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<string> GetlastCodeAsync()
        {
            var year = DateTime.Now.ToString("yy");
            var lastSerial = "";
            var all = await _reciveRepository.GetAllAsync();
            var last = all?.LastOrDefault();
            if (last != null)
            {
                var year2 = last.BnanWhatsappReciveCode.Substring(0, 2);
                var reminder = last.BnanWhatsappReciveCode.Substring(2, 6);

                if (year2 == year)
                {
                    lastSerial = year + (Convert.ToInt16(reminder) + 1).ToString("000000");
                }
                else
                {
                    lastSerial = year + "000001";
                }
            }
            return lastSerial;
        }
    }
}
