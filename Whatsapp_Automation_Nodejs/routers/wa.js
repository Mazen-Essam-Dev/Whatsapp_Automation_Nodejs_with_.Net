const express = require("express");

const {sendMedia_by_url,sendMedia_by_file,sendMessage_text,sendMessage_text_s,test,isClientReady_data,generateQrCodeNew2,addNew_Device,checkisClientInitialized,testUpload,checkReciver,deleteMessage,logout_whats,Check_is_Connected_OrNot,getThisImage,generateQrCodeNew3} = require("../controllers/waController");

const router = express.Router();



const fs = require('fs');
const multer = require('multer');

const path = require('path');

/*router.get("/api", (req,res)=>{
    res.json({status : "OK" });
});*/

// التأكد من وجود مجلد "uploads"
if (!fs.existsSync('../uploads')) {
  fs.mkdirSync('../uploads');
}

// // // إعداد المجلد الذي سيتم تخزين الملفات فيه
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       cb(null, '../uploads'); // تحديد مجلد رفع الملفات
// //     },
// //     filename: (req, file, cb) => {
// //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
// //     }
// //   });
  
// //   // إعداد multer
// //   const upload = multer({ storage: storage });

// //   router.get("/api/upload",upload.single('file'), testUpload);
// //   router.post("/api/upload",upload.single('file'), testUpload);



///// ==== Used ========///////

router.get("/api/generateQrCodeNew2/:id", generateQrCodeNew2);
router.post("/api/generateQrCodeNew2/:id", generateQrCodeNew2);

router.get("/api/generateQrCodeNew3", generateQrCodeNew3);
router.post("/api/generateQrCodeNew3", generateQrCodeNew3);

router.get("/api/isClientReady_data/:id", isClientReady_data);
router.post("/api/isClientReady_data/:id", isClientReady_data);

router.get("/api/logout_whats/:id", logout_whats);
router.post("/api/logout_whats/:id", logout_whats);

router.get("/api/sendMessage_text", sendMessage_text);
router.post("/api/sendMessage_text", sendMessage_text);

router.get("/api/sendMedia_by_file", sendMedia_by_file);
router.post("/api/sendMedia_by_file", sendMedia_by_file);

router.get("/api/addNew_Device", addNew_Device);
router.post("/api/addNew_Device", addNew_Device);

router.get("/api/checkisClientInitialized/:id", checkisClientInitialized);
router.post("/api/checkisClientInitialized/:id", checkisClientInitialized);

router.get("/api/Check_is_Connected_OrNot/:id", Check_is_Connected_OrNot);
router.post("/api/Check_is_Connected_OrNot/:id", Check_is_Connected_OrNot);


///// ==== NOT Used ========///////





router.get("/api/checkReciver", checkReciver);
router.post("/api/checkReciver", checkReciver);
router.get("/api/deleteMessage", deleteMessage);
router.post("/api/deleteMessage", deleteMessage);


router.get("/api/getThisImage/:id", getThisImage);
router.post("/api/getThisImage/:id", getThisImage);


router.get("/api/sendMedia_by_url", sendMedia_by_url);
router.post("/api/sendMedia_by_url", sendMedia_by_url);

router.get("/api/sendMessage_text_s", sendMessage_text_s);
router.post("/api/sendMessage_text_s", sendMessage_text_s);

/////////==== Ended ======//////

router.get("/api/test", test);

module.exports = router;