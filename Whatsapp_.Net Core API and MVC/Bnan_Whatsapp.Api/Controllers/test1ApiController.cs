using Bnan_Whatsapp.Core.Interfaces;
using Bnan_Whatsapp.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bnan_Whatsapp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class test1ApiController : ControllerBase
    {
        private readonly IBaseRepository<BnanWhatsappSender> _SendersRepository;
        public test1ApiController(IBaseRepository<BnanWhatsappSender> SendersRepository)
        {
            _SendersRepository= SendersRepository;
        }

        [HttpGet]
        public IActionResult GetbyId()
        {
            return Ok(_SendersRepository.GetById("250001"));
            //return Ok(new {fgf ="4343",gfg="gfg"});
        }

        [HttpGet,Route("GetbyId/{id}")]
        public IActionResult GetbyId(string id)
        {
            return Ok(_SendersRepository.GetById(id));
            //return Ok(new {fgf ="4343",gfg="gfg"});
        }
    }
}
