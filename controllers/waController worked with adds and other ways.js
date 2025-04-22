
const { Client,LocalAuth,MessageMedia } = require('whatsapp-web.js');

//const { Client,LocalAuth,MessageMedia,List,Buttons,Contact,ClientInfo,Message,Chat,version } = require('../src.js');

//////
//////////
///////
//////////

//const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const body = require('body-parser');
const querystring = require('querystring');
const { stringify, parse } = require('flatted');

const path = require('path');
const { removeSession ,save_file_Session,load_file_Session,remove_file_Session} = require('./session.js'); // استيراد وظائف الجلسة

//const qrcode = require('qrcode-terminal');

// تحديد مسار المجلد
//const authDir = path.join(__dirname, '../.wwebjs_auth');
const authDir = path.join(__dirname, '../sessions');
const chromepath = path.join(__dirname, '../chrome/win64-127.0.6533.88/chrome-win64/chrome.exe');


//const {connection ,get_connect_Data , update_connect_user_mob ,insert_connect_user_mob ,insert_connect } = require('./dbContext');



  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



  
const mssql = require('mssql');

const connectionString ='Server=localhost,14333;Database=whats_db;User Id=bnanwhats;Password=Maz@123456en;TrustServerCertificate=True;';
//const connectionString ='Server=localhost,14333;Database=whats_db;User Id=bnanwhats;Password=Maz@123456en;Trusted_Connection=True;TrustServerCertificate=True;';


    async function insert_company(company_id,company_name) {
        return new Promise(async function(resolve, reject){
        try{
            let query1 = "INSERT INTO company (company_id,company_name,company_status) VALUES ('"+ company_id +"',N'" +company_name+"','" +"A"+"')";
            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            const result = await request.query(query1);
            resolve(result.rowsAffected[0]);
            //return result.rowsAffected[0];
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
      }

      async function getListOfAll_Companies_FromDB() {
        return new Promise(async function(resolve, reject){
        try{
            let query1 = 'SELECT company_id,company_name,company_status FROM company'; 

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            const results = await request.query(query1);
            var string=JSON.stringify(results);
            //console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log('>> json: ', json);
            resolve(json);
            //resolve(result.rowsAffected[0]);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
      }
      
      getListOfAll_Companies_FromDB().then(result=>{
        console.log("Affected rowes: ",result," :Rows");
      });

      async function get_last_connect_serial(connect_id) {
        return new Promise(async function(resolve, reject){
        try{
            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status ='D';
            console.log("my id is :",connect_id);
            //let query1 = "SELECT MAX(connect_LogOut_Datetime) AS Max_Logout ,connect_id,connect_serial FROM connect where connect_id ='"+connect_id+"' AND connect_status ='D' GROUP BY connect_id,connect_serial";
            let query1 = "SELECT MAX(connect_serial) AS Max_connect_serial ,connect_id FROM connect where connect_id ='"+connect_id+"' AND connect_serial IS NOT NUll GROUP BY connect_id";
            const results = await request.query(query1);
            if(results.recordset[0] === undefined){
                console.log("get_last_connect_serial : NULL");
                resolve("0");
            }
            else{
                console.log("get_last_connect_serial : ",results.recordset[0]);
                let mySerial = results.recordset[0].Max_connect_serial;
                let numSerial = Number(mySerial);
                numSerial = numSerial +1;
                console.log(numSerial);
                resolve(numSerial.toString());
            }
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
      }

      async function get_connect_spacific_A_N(connect_id) {
        return new Promise(async function(resolve, reject){
        try{
            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status ='A';
            console.log("my id is :",connect_id);
            let query1 = "SELECT * FROM connect WHERE (( connect_id = '"+connect_id+"' AND connect_status ='"+connect_status+"' AND connect_Login_Datetime IS NOT NULL) OR ( connect_id = '"+connect_id+"' AND connect_status ='N' AND connect_Login_Datetime IS NULL))";
            const results = await request.query(query1);
            if(results.recordset[0] === undefined){
                console.log("get_connect_spacific_A_N : NULL")
                resolve("NULL");
            }
            else{
                console.log("get_connect_spacific_A_N : ",results.recordset[0])
                resolve(results);
            }
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
      }
      
      async function get_connect_spacific_A_only(connect_id) {
        return new Promise(async function(resolve, reject){
        try{
            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status ='A';
            console.log("my id is :",connect_id);
            let query1 = "SELECT * FROM connect WHERE ( connect_id = '"+connect_id+"' AND connect_status ='"+connect_status+"' AND connect_Login_Datetime IS NOT NULL) ";
            const results = await request.query(query1);
            if(results.recordset[0] === undefined){
                console.log("get_connect_spacific_A_only : NULL")
                resolve("NULL");
            }
            else{
                console.log("get_connect_spacific_A_only : ",results.recordset[0])
                resolve(results);
            }
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
      }

      async function insert_connect_New(connect_id ,connect_status,serial) {
        get_connect_spacific_A_N(connect_id).then(res=>{
            if(res == "NULL"){
                console.log("i will insert");
                return new Promise(async function(resolve, reject){
                    try{
                        poolconnection = await mssql.connect(connectionString);
                        const request = await poolconnection.request();

                        let query1 = "INSERT INTO connect (connect_id,connect_serial,connect_status) VALUES( '"+connect_id+"','"+serial+"','"+connect_status+"')"; 
                        const results = await request.query(query1);
                        console.log("inserted sucess");
                        resolve(results);
                    }catch(err){
                        console.log('Error in DB connection: ',err);
                        reject(err);
                    }
                    });
            }
        }); 
      }

    
    async function update_connect_user_mob(connect_id,connect_name,connect_mobile,connect_deviceType ,connect_isBussenis ,connect_status) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            //let currentTime = new Date();            
            //let currentTime_login = currentTime.toISOString().slice(0, 19).replace('T', ' ');
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let local_currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            let currentTime_login = local_currentTime;
            let query1 = "UPDATE connect SET connect_name = N'"+connect_name+"' , connect_mobile = '"+connect_mobile+"' , connect_deviceType = '"+connect_deviceType+"' , connect_isBussenis = '"+connect_isBussenis+"' , connect_status = '"+connect_status+"' , connect_Login_Datetime = '"+currentTime_login+"' WHERE connect_id = '"+connect_id+"' AND connect_Login_Datetime IS NULL";
            const results = await request.query(query1);
            resolve(results);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }


    async function update_setup_install_by_id_Disconnected(connect_id) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status = 'D';
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let local_currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            let connect_LogOut_Datetime = local_currentTime;
            let query1 = "UPDATE connect SET connect_status = '"+connect_status+"',connect_LogOut_Datetime= '"+connect_LogOut_Datetime+"' WHERE connect_id = '"+connect_id+"' AND connect_status ='A'";
            const results = await request.query(query1);
            resolve(results);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }

    async function update_Message_status_delivered(message_id) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status = 'D';
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let local_currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            let delivered_Datetime = local_currentTime;
            let query1 = "UPDATE Message SET Message_Status = '2',Message_Received_DateTime= '"+delivered_Datetime+"' WHERE Message_Id = '"+message_id+"' AND Message_Received_DateTime IS NULL";
            const results = await request.query(query1);
            resolve(results);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }

    
    async function update_Message_status_Read(message_id) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status = 'D';
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let local_currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            let readed_Datetime = local_currentTime;
            let query1 = "UPDATE Message SET Message_Status = '3',Message_Read_DateTime= '"+readed_Datetime+"' WHERE Message_Id = '"+message_id+"' AND Message_Read_DateTime IS NULL; UPDATE Message SET Message_Received_DateTime= '"+readed_Datetime+"' WHERE Message_Id = '"+message_id+"' AND Message_Received_DateTime IS NULL";
            const results = await request.query(query1);
            resolve(results);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }

    async function update_connect_disconnected(connect_id) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let connect_status = 'N';
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let local_currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            let currentTime_out = local_currentTime;
            let query1 = "UPDATE connect SET connect_status = '"+connect_status+"' , connect_LogOut_Datetime = '"+currentTime_out+"' WHERE connect_id =  '"+connect_id+"' AND connect_LogOut_Datetime IS NULL ";
            const results = await request.query(query1);
            resolve(results);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }

    async function get_connect_Data(connect_id) {
        return new Promise(async function(resolve, reject){
        try{

            poolconnection = await mssql.connect(connectionString);
            const request = await poolconnection.request();
            let query1 = "SELECT * FROM connect  WHERE connect_id = '"+connect_id+"' AND connect_status ='A'";
            const results = await request.query(query1);
            console.log('>> data of ready: ', results.recordset);
            resolve(results.recordset);
        }catch(err){
            console.log('Error in DB connection: ',err);
            reject(err);
        }
        });
    }

async function getListOfStringsFromconnectDB(connect_id) {
    return new Promise(async function(resolve, reject){
    try{

        poolconnection = await mssql.connect(connectionString);
        const request = await poolconnection.request();
        let query1 = 'SELECT connect_name FROM connect'; 
        const results = await request.query(query1);
        // تحويل النتائج إلى قائمة من السلاسل النصية
        const names = results.map(row => row.connect_name);
        resolve(names); // إرجاع قائمة السلاسل النصية       
        //resolve(result.rowsAffected[0]);
    }catch(err){
        console.log('Error in DB connection: ',err);
        reject(err);
    }
    });
}

async function getListOfStringsFrom_Setup_Active_DB() {
    return new Promise(async function(resolve, reject){
    try{

        poolconnection = await mssql.connect(connectionString);
        const request = await poolconnection.request();
        let query1 = "SELECT company_id FROM company WHERE company_status <> 'N'"; 
        const results = await request.query(query1);
        resolve(results.recordset);       
    }catch(err){
        console.log('Error in DB connection: ',err);
        reject(err);
    }
    });
}

async function getListOfStringsFrom_Setup_NotSub_DB() {
    return new Promise(async function(resolve, reject){
    try{

        poolconnection = await mssql.connect(connectionString);
        const request = await poolconnection.request();
        let query1 = "SELECT company_id FROM company WHERE company_status = 'N'"; 
        const results = await request.query(query1);
        resolve(results.recordset);    
    }catch(err){
        console.log('Error in DB connection: ',err);
        reject(err);
    }
    });
}

async function getListOfStringsFrom_All_Setup_Ids_DB() {
    return new Promise(async function(resolve, reject){
    try{

        poolconnection = await mssql.connect(connectionString);
        const request = await poolconnection.request();
        let query1 = "SELECT company_id FROM company"; 
        const results = await request.query(query1);
        resolve(results.recordset);   
    }catch(err){
        console.log('Error in DB connection: ',err);
        reject(err);
    }
    });
}

getListOfStringsFrom_Setup_Active_DB().then(result =>{
    console.log("All Ids of Setup_Active", result);
});

getListOfStringsFrom_Setup_NotSub_DB().then(result =>{
    console.log("All Ids of Setup_NotSub", result);
});

getListOfStringsFrom_All_Setup_Ids_DB().then(result =>{
    console.log("All Ids of All_Setup_Ids", result);
});

//module.exports ={connection ,get_connect_Data , update_connect_user_mob ,insert_connect_user_mob ,insert_connect };



var myList = new Array();
var myindixes = new Array();

async function setAllsessions_Initializing(id,time){
    
    if(time==="2"){
        console.log("wait 20 seconds");
        await wait(20000);
        //let myid = id.substring(1);
        let myid = id;
        let numId = Number(myid);
        //to remove from List and indexies
        let index_to_remove= myindixes.indexOf(numId);
        myList.splice(index_to_remove, 1);
        myindixes.splice(index_to_remove, 1);
        console.log("i finished waited 20 seconds");
    }
    let client_id = "client_"+id;
    let this_client = new Client({
    authStrategy : new LocalAuth({
        //dataPath: authDir,
        clientId: client_id,
    }),
    puppeteer: {
        //executablePath: chromepath,  // أو مسار Chrome المثبت محليًا
        headless: true, // تشغيل المتصفح في وضع headless
        args: ['--no-sandbox', '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',  // تقليل استخدام الذاكرة المشتركة
            '--disable-extensions',
            '--disable-gpu'  // إذا كان GPU غير مطلوب
        ],
        timeout: 29000, // زيادة وقت الانتظار إلى 29 ثانية
        ignoreHTTPSErrors: true, // تجاهل أخطاء SSL
        }
});       

this_client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log('message after it was deleted: ',after); // message after it was deleted.
    if (before) {
        console.log('message before it was deleted: ',before); // message before it was deleted.
    }
});

this_client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log('message before it was deleted: ',msg.body); // message before it was deleted.
});

this_client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body === '!ping') {
        // Send a new message to the same chat
        this_client.sendMessage(msg.from, 'pong');

    } 
    else if (msg.body === 'mm') {
        // Send a new message to the same chat
        msg.delete(true);
    } 
else if (msg.body === '!delete') {
    if (msg.hasQuotedMsg) {  // hasQuotedMsg الرسالة التي تم الرد عليها بكلمة !delete
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.fromMe) {
            quotedMsg.delete(true);
        } else {
            msg.reply('I can only delete my own messages');
        }
    }
}
// لعمل القائمة كاملة 
else if (msg.body === '1' || msg.body === '١') {
    let num = msg.body;
    if (msg.hasQuotedMsg) {  // hasQuotedMsg <-- الرسالة الاساسية التي تم الرد عليها بحرف 1  
        const quotedMsg = await msg.getQuotedMessage();
        try{
            let messageText = quotedMsg.body;
            if(messageText.includes('(') && messageText.includes(')') && quotedMsg.fromMe){ // And replay for my origin message
            let contract_id = messageText.split("(")[1];
            contract_id = contract_id.split(")")[0];

            console.log(messageText);
            console.log('this contract id is: ',contract_id);
            //msg.reply('this contract id is: '+ contract_id);
            let mediaFile = "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg";
            let phone = msg.from;
            //let message1 = 'this contract id is: '+ contract_id;
            let message1 = 'تم اختيار المستند رقم : '+ num + ' ورقم عقدكم هو : '+ contract_id;
            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
                let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
                // await this_client.sendMessage(phone, media, { caption : message1}).then((result) => {
                await this_client.sendMessage(phone,message1).then((result) => {
                    console.log("Replay Sent Contract");
                //   res.status(200).json({
                //       status: true,
                //       response: {messageId : result.id.id, connect : phone ,message:message1  },
                //   });
                });
              }
        }
        }catch(error1){
            console.log('error in : send replay For List Maz ',error1);
        }
    }
}


// لعمل القائمة كاملة 
else if (msg.body === '2' || msg.body === '٢') {
    let num = msg.body;
    if (msg.hasQuotedMsg ) {  // hasQuotedMsg <-- الرسالة الاساسية التي تم الرد عليها بحرف 2   
        const quotedMsg = await msg.getQuotedMessage();
        try{
            let messageText = quotedMsg.body;
            if(messageText.includes('(') && messageText.includes(')') && quotedMsg.fromMe){ // And replay for my origin message
            let contract_id = messageText.split("(")[1];
            contract_id = contract_id.split(")")[0];

            console.log(messageText);
            console.log('this contract id is: ',contract_id);
            //msg.reply('this contract id is: '+ contract_id);
            let mediaFile = "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg";
            let phone = msg.from;
            //let message1 = 'this contract id is: '+ contract_id;
            let message1 = 'تم اختيار المستند رقم : '+ num + ' ورقم عقدكم هو : '+ contract_id;
            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
                let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
                // await this_client.sendMessage(phone, media, { caption : message1}).then((result) => {
                await this_client.sendMessage(phone,message1).then((result) => {
                    console.log("Replay Sent Contract");
                //   res.status(200).json({
                //       status: true,
                //       response: {messageId : result.id.id, connect : phone ,message:message1  },
                //   });
                });
              }
        }
        }catch(error1){
            console.log('error in : send replay For List Maz ',error1);
        }
    }
}


// لعمل القائمة كاملة 
else if (msg.body === '3' || msg.body === '٣') {
    let num = msg.body;
    if (msg.hasQuotedMsg ) {  // hasQuotedMsg <-- الرسالة الاساسية التي تم الرد عليها بحرف 3   
        const quotedMsg = await msg.getQuotedMessage();
        try{
            let messageText = quotedMsg.body;
            if(messageText.includes('(') && messageText.includes(')') && quotedMsg.fromMe){ // And replay for my origin message
            let contract_id = messageText.split("(")[1];
            contract_id = contract_id.split(")")[0];

            console.log(messageText);
            console.log('this contract id is: ',contract_id);
            //msg.reply('this contract id is: '+ contract_id);
            let mediaFile = "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg";
            let phone = msg.from;
            //let message1 = 'this contract id is: '+ contract_id;
            let message1 = 'تم اختيار المستند رقم : '+ num + ' ورقم عقدكم هو : '+ contract_id;
            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
                let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
                // await this_client.sendMessage(phone, media, { caption : message1}).then((result) => {
                await this_client.sendMessage(phone,message1).then((result) => {
                    console.log("Replay Sent Contract");
                //   res.status(200).json({
                //       status: true,
                //       response: {messageId : result.id.id, connect : phone ,message:message1  },
                //   });
                });
              }
        }
        }catch(error1){
            console.log('error in : send replay For List Maz ',error1);
        }
    }
}


// لعمل القائمة كاملة 
else if (msg.body === '4' || msg.body === '٤') {
    let num = msg.body;
    if (msg.hasQuotedMsg) {  // hasQuotedMsg <-- الرسالة الاساسية التي تم الرد عليها بحرف 4   
        const quotedMsg = await msg.getQuotedMessage();
        try{
            let messageText = quotedMsg.body;
            if(messageText.includes('(') && messageText.includes(')') && quotedMsg.fromMe){ // And replay for my origin message
            let contract_id = messageText.split("(")[1];
            contract_id = contract_id.split(")")[0];

            console.log(messageText);
            console.log('this contract id is: ',contract_id);
            //msg.reply('this contract id is: '+ contract_id);
            let mediaFile = "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg";
            let phone = msg.from;
            //let message1 = 'this contract id is: '+ contract_id;
            let message1 = 'تم اختيار المستند رقم : '+ num + ' ورقم عقدكم هو : '+ contract_id;
            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
                let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
                // await this_client.sendMessage(phone, media, { caption : message1}).then((result) => {
                await this_client.sendMessage(phone,message1).then((result) => {
                    console.log("Replay Sent Contract");
                //   res.status(200).json({
                //       status: true,
                //       response: {messageId : result.id.id, connect : phone ,message:message1  },
                //   });
                });
              }
        }
        }catch(error1){
            console.log('error in : send replay For List Maz ',error1);
        }
    }
}
});
// this_client.on('message_create', async (msg) => {
//     // Fired on all message creations, including your own
//     // //await wait(5000);
//     // //msg.delete(false,true);
//     await wait(15000);
//     // //await msg.delete(false);

//     //if (msg.fromMe) {
//         // do stuff here
//         try{
//             msg.delete(true);
//         }catch(error1){
//             console.log('error in : Delete message',error1);
//         }
//         // //setTimeout(msg.delete, 10000,true);
//     //}
// });

this_client.on('message_create', async (msg) => {


        // try{
        //     let messageText = msg.body;
        //     if(messageText.includes('(') && messageText.includes(')')){
        //     let contract_id = messageText.split("(")[1];
        //     contract_id = contract_id.split(")")[0];

        //     console.log(messageText);
        //     console.log('this contract id is: ',contract_id);
        //     //msg.reply('this contract id is: '+ contract_id);
        //     let mediaFile = "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg";
        //     let phone = msg.from;
        //     let message1 = 'this contract id is: '+ contract_id;
        //     if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
        //         let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
        //         await this_client.sendMessage(phone, media, { caption : message1}).then((result) => {
        //             console.log("Replay Sent Contract");
        //         //   res.status(200).json({
        //         //       status: true,
        //         //       response: {messageId : result.id.id, connect : phone ,message:message1  },
        //         //   });
        //         });
        //       }
        // }
        // }catch(error1){
        //     console.log('error in : send replay For List Maz ',error1);
        // }

});


this_client.on('message_ack', async(message, ack) => {
    // هنا يمكنك التحقق من قيمة ack لمعرفة حالة الرسالة
    await wait (4000);
    switch (ack) {
        case 0:
            console.log(' تم إرسال الرسالة لكن لم يتم استلامها بعد من الخادم',message.id.id);
            break;
        case 1:
            console.log(' تم استلام الرسالة من الخادم',message.id.id);
            break;
        case 4:
            console.log(' تم تشغيل وفتح الملف',message.id.id);
            break;
        case 2:
            console.log(' تم تسليم الرسالة إلى المستلم',message.id.id);
            update_Message_status_delivered(message.id.id).then(result3 =>{
                console.log('Saved Recived Message Successfully: ',message.body);
            }).catch(err=>{
                console.log("error in save Read Message in DB :",message.id.id);
            });
            break;
        case 3:
            console.log(' تمت قراءة الرسالة من قبل المستلم',message.id.id);
            update_Message_status_Read(message.id.id).then(result3 =>{
                console.log('Saved Read Message Successfully: ',message.body);
            }).catch(err=>{
                console.log("error in save Read Message in DB :",message.id.id);
            });
            break;
        default:
            console.log(' حالة غير معروفة للرسالة',message.id.id);
        //message.id.id   // message.body  // message.caption  // message.type   // message.t ==  1730035141  // message.timestamp  // message.from  // message.to  = 201112847004@c.us // remove(@c.us) // message.deviceType
        }
});

this_client.on('ready', async() => {
    console.log('Client is ready!: ',id);
    let clientInfo = this_client.info;
    console.log(clientInfo);
    //let session_data1 = stringify(this_client, null, 2);
    //save_file_Session(session_data1,id);
    get_last_connect_serial(id).then(serial=>{
    insert_connect_New(id,'N',serial).then(result=>{
    update_connect_user_mob(id, clientInfo.pushname, clientInfo.wid.user, clientInfo.platform , clientInfo.isBusiness ,'A').then(result=>{
        console.log("Subscriped is saved in DB Successfully");       
    });
    });});
    });

this_client.on('authenticated', async(session) => {
    console.log("session Saved sucessfully: ",id);
});

// التعامل مع فقدان الجلسة
this_client.on('auth_failure', async(msg) => {
    console.log('فشل المصادقة:', msg);
    removeSession(id);
});

this_client.on('disconnected', (resson) => {
    process.on('uncaughtException', (err) => {
        console.error('An error occurred_1_disconnected:', err);
    });

    console.log('Client disconnected: ',id, resson);
    console.log('Client disconnected: ',id, resson);

    removeSession(id);

    console.log('Client disconnected: ',id, resson);
    

    update_setup_install_by_id_Disconnected(id).then(result=>{
        get_last_connect_serial(id).then(serial=>{
            insert_connect_New(id,'N',serial).then(res=>{
                setAllsessions_Initializing(id,"2");
                console.log("Un Subscriped (Disconnected) is saved in DB Successfully");
            });
        });

    });

});

this_client.on('error', async (error) => {
    console.error('An error occurred_2_error:', error);
});

this_client.initialize();

//myList.push(this_client);
//let myid = id.substring(1);
let myid = id
let numId = Number(myid);
myList.splice(numId, 0, this_client);
myindixes.splice(numId, 0, numId);

//console.log(myList);
console.log(myindixes);
await wait (3000);

//let session_data = JSON.stringify(this_client);
//let session_data = stringify(this_client, null, 2);
//save_file_Session(session_data,id);

//console.log(myindixes.indexOf(numId));
//////////////
/////////////
////////////

}
    

//////////
//////////
/////////
// //const fs = require('fs');
const filePath = './sessions/data.json';

// كائن JSON الذي نريد حفظه
const data = {
    name: "Mazen",
    age: 30,
    city: "New York"
};

// التحقق من وجود الملف، إذا لم يكن موجودًا نقوم بإنشائه
if (!fs.existsSync(filePath)) {
    // تحويل JSON إلى string وحفظه في الملف
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('File created and data saved!');
} else {
    console.log('File already exists.');
}

// استرجاع البيانات من الملف وتحويلها إلى JSON
const fileContent = fs.readFileSync(filePath, 'utf-8');
const jsonData = JSON.parse(fileContent);

console.log('Data retrieved from file:', jsonData);
console.log(jsonData);
console.log(jsonData.age," ",jsonData.name);
////////////
///////////
///////////


getListOfStringsFrom_All_Setup_Ids_DB().then(result =>{
    result.forEach(element => {
        console.log("All Ids of ", element.company_id);

        setAllsessions_Initializing(element.company_id.toString(),"0");
    });
});

// مفتاح سري لتوقيع الـ JWT
const SECRET_KEY = 'your-secret-key';



// // client.on('message', msg => {
// //     if (msg.body === '!ping') {
// //         //msg.reply('pong');
// //         client.sendMessage(msg.from ,'pong');
// //     }
// // });

// // الاستماع للرسائل الواردة والرد عليها تلقائيًا
// client.on('message', message => {
//     console.log(`Received message: ${message.body}`);
//     console.log(`Received message ID: ${message.id.id}`);
//     console.log(`Received message From: ${message.from}`);
//     console.log(`Received message To: ${message.to}`);
//     console.log(`Received message time: ${message.timestamp}`);

    
//     // الرد برسالة تلقائية
//     if (message.body.toLowerCase() === 'hello') {
//         message.reply('Hello! How can I assist you today?');
//     } 
//     // else {
//     //     message.reply('This is an automated response.');
//     // }
// });

// client.on('message', message => {
//     if (message.body.toLowerCase().includes('help')) {
//         message.reply('How can I assist you?');
//     } else if (message.body.includes('bye')) {
//         message.reply('Goodbye!');
//     } 
//     // else {
//     //     message.reply('I did not understand your message.');
//     // }
// });




// // إنشاء أو تحميل عميل WhatsApp
// function createClient(id) {
//     let client;
//     if (sessions[id]) {
//         client = new Client({ session: sessions[id] });
//     } else {
//         client = new Client();
//         client.on('qr', qr => {
//             console.log(`QR for client ${id}: ${qr}`);
//         });
//         client.on('authenticated', (session) => {
//             sessions[id] = session;
//             fs.writeFileSync('session.json', JSON.stringify(sessions));
//         });
//     }
    
//     client.initialize();
//     return client;
// }


/*router.get('/', async (req, res) => {
    try {
        const client = new Client(...)
        let qr = await new Promise((resolve, reject) => {
            client.once('qr', (qr) => resolve(qr))
            setTimeout(() => {
                reject(new Error("QR event wasn't emitted in 15 seconds."))
            }, 15000)
        })
        res.send(qr)
    } catch (err) {
        res.send(err.message)
    }
}*/



const sendMedia_by_url = async (req,res)=> {
        
    req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
    res.setTimeout(22000); // 22000 مللي ثانية (22 ثانية)

    const Token = "Bnan_fgfghgfhnbbbmhhjhgmghhgghhgj";
    let phone = req.query.phone || req.body.phone;
    const message = req.query.message || req.body.message;
    let apiToken = req.query.apiToken || req.body.apiToken;
    let id = req.query.id || req.body.id;
    const mediaFile = req.query.mediaFile || req.body.mediaFile;

    //let myid = id.substring(1);
    let myid = id;
    let numId = Number(myid);
    console.log(id);
    console.log(myid);
    console.log(numId);
    
    //// let this_client = myList[numId - 1];
    let this_client = myList[myindixes.indexOf(numId)];

    phone = phone + "@c.us";
    
    if(apiToken !== Token){
        return res
        .status(401).json({status:"false",error:"This invalid Token"});
    }

        // انتظر لمدة 7 ثواني (7000 مللي ثانية)
        await wait(7000);  
        console.log('7 seconds later...');

    try {


        const user = await this_client.isRegisteredUser(phone);
        if(user){

            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
              let media = await MessageMedia.fromUrl(mediaFile, {unsafeMime : true});
              await this_client.sendMessage(phone, media, { caption : message}).then((result) => {
                res.status(200).json({
                    status: true,
                    response: {messageId : result.id.id, connect : phone ,message:message  },
                });
              });
            }
            else{
                await this_client.sendMessage(phone,message).then((result) => {
                res.json({status:"true", response: {messageId : result.id.id, connect : phone ,message:message  }})
            });
        }            
            
        }else{
            res.json({status:"false", error:"this phone not registered in whatsapp"});
        }

        console.log(message);
        console.log(phone);
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"false",error:"Error Server"});
    }
    
};






  const testUpload =  (req, res) => {
    // الملف
    const file = req.file;
  
    // النص (مثلاً، عنوان أو وصف)
    const text = req.body.text;
  
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
    if (!text) {
      return res.status(400).send('No text provided.');
    }
  
    // هنا يمكنك القيام بأي شيء بالملف والنص، مثل تخزينهما في قاعدة البيانات
    res.status(200).json({
      message: 'File and text uploaded successfully!',
      file: file,
      text: text
    });
  };


const sendMedia_by_file = async (req,res)=> {
        
    //req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
    //res.setTimeout(22000); // 22000 مللي ثانية (22 ثانية)

    let body = '';
    // تجميع البيانات المستلمة عبر chunks
    req.on('data', chunk => {
        body += chunk.toString(); // تحويل الـ chunk إلى نص
    });

    // بعد استلام جميع البيانات
    req.on('end', async() => {
        console.log(body);
    //// تحليل البيانات المرسلة بتنسيق URL-encoded
    //const decodedQuery = decodeURIComponent(body);
    const parsedBody = querystring.parse(body);
    //const params = new URLSearchParams(query);
    //const parsedBody = new URLSearchParams(body);

    // الوصول إلى البيانات من body

    const Token = "Bnan_fgfghgfhnbbbmhhjhgmghhgghhgj";
    let phone =  parsedBody.phone;
    const message =  parsedBody.message;
    let apiToken = parsedBody.apiToken;
    let id =  parsedBody.id;
    const file_name =  parsedBody.file_name;
    const mediaFile22 =  parsedBody.mediaFile;
    let mediaFile = "h";
    mediaFile = body.split("&mediaFile=").pop();

    //mediaFile.split(" ").join("");
    console.log(id,phone);
    //let myid = id.substring(1);
    let myid = id;
    let numId = Number(myid);
    console.log(id);
    console.log(myid);
    console.log(numId);
    
    //// let this_client = myList[numId - 1];
    let this_client = myList[myindixes.indexOf(numId)];

    console.log(mediaFile);

    phone = phone + "@c.us";
    
    if(apiToken !== Token){
        return res
        .status(401).json({status:"false",error:"This invalid Token"});
    }

        // انتظر لمدة 7 ثواني (7000 مللي ثانية)
        await wait(7000);  
        console.log('7 seconds later...');

    try {


        const user = await this_client.isRegisteredUser(phone);
        if(user){

            if(mediaFile !== undefined && mediaFile !== null && mediaFile !== ""){
                //let media = MessageMedia.fromFilePath('./path_to_file/image.jpg');
                //fs.writeFileSync('foo.png',mediaFile,'base64');
                fs.writeFileSync('./uploads/'+file_name,mediaFile,'base64');
                
                //let media = await MessageMedia.fromFilePath("foo.png");
                let media = await MessageMedia.fromFilePath('./uploads/'+file_name);

              await this_client.sendMessage(phone, media, { caption : message}).then((result) => {
                fs.unlinkSync('./uploads/'+file_name);
                res.status(200).json({
                    status: true,
                    response: {messageId : result.id.id, connect : phone ,message:message  },
                });
              });
            }
            else{
                await this_client.sendMessage(phone,message).then((result) => {
                res.json({status:"true", response: {messageId : result.id.id, connect : phone ,message:message  }})
            });
        }            
            
        }else{
            res.json({status:"false", error:"this phone not registed in whatsapp"});
        }

        console.log(message);
        console.log(phone);
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"false",error:"Error Server"});
    }
});   
};

const sendMessage_text = async (req,res)=> {
    
    req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
    res.setTimeout(22000); // 22000 مللي ثانية (22 ثانية)
    

    let body = '';
    // تجميع البيانات المستلمة عبر chunks
    req.on('data', chunk => {
        body += chunk.toString(); // تحويل الـ chunk إلى نص
    });

    // بعد استلام جميع البيانات
    req.on('end', async() => {
    // تحليل البيانات المرسلة بتنسيق URL-encoded
    const parsedBody = querystring.parse(body);

    // الوصول إلى البيانات من body

    const Token = "Bnan_fgfghgfhnbbbmhhjhgmghhgghhgj";
    let phone =  parsedBody.phone;
    const message =  parsedBody.message;
    let apiToken = parsedBody.apiToken;
    let id =  parsedBody.id;

    phone = phone + "@c.us";
    

    console.log(id,phone);
    //let myid = id.substring(1);
    let myid = id;
    let numId = Number(myid);
    console.log(id);
    console.log(myid);
    console.log(numId);
    
    //let session_data = CircularJSON.stringify(this_client);
    //load_file_Session(id).then(async this_client1=>{
    //console.log(this_client1);
    //let this_client = CircularJSON.parse(session_data);


    //// let this_client = myList[numId - 1];
    
    let this_client = myList[myindixes.indexOf(numId)];
    //console.log(this_client);

    if(apiToken !== Token){
        return res
        .status(401).json({status:"false",error:"This invalid Token"});
    }
        // انتظر لمدة 7 ثواني (7000 مللي ثانية)
        await wait(7000);  
        console.log('7 seconds later...');

    try {
        const result_A = await get_connect_spacific_A_only(id);
        if(result_A !== "NULL"){
            const user = await this_client.isRegisteredUser(phone);
            if(user){
                await this_client.sendMessage(phone,message).then((result) => {
                    //console.log(result);
                    res.json({status:"true", response: {messageId : result.id.id, connect : phone ,message:message  }})
                    //res.json({status:"true", response: {messageId : result.id._serialized, connect : result.from ,message:message  }})
                });
            
                
            }else{
                res.json({status:"false", error:"this phone not registed in whatsapp"});
            }
    
            console.log(message);
            console.log(phone);
        }
        else{
            res.json({status:"false", error:"this Company is Disconnected From whatsapp"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"false",error:"Error Server"});
    }
//});
});
};


// // const sendMessage_text = async (req,res)=> {
    
// //     req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
// //     res.setTimeout(22000); // 22000 مللي ثانية (22 ثانية)
    

// //     let body = '';
// //     // تجميع البيانات المستلمة عبر chunks
// //     req.on('data', chunk => {
// //         body += chunk.toString(); // تحويل الـ chunk إلى نص
// //     });

// //     // بعد استلام جميع البيانات
// //     req.on('end', async() => {
// //     // تحليل البيانات المرسلة بتنسيق URL-encoded
// //     const parsedBody = querystring.parse(body);

// //     // الوصول إلى البيانات من body

// //     const Token = "Bnan_fgfghgfhnbbbmhhjhgmghhgghhgj";
// //     let phone =  parsedBody.phone;
// //     const message =  parsedBody.message;
// //     let apiToken = parsedBody.apiToken;
// //     let id =  parsedBody.id;

// //     phone = phone + "@c.us";
    

// //     console.log(id,phone);
// //     //let myid = id.substring(1);
// //     let myid = id;
// //     let numId = Number(myid);
// //     console.log(id);
// //     console.log(myid);
// //     console.log(numId);
    
// //     //let session_data = CircularJSON.stringify(this_client);
// //     //load_file_Session(id).then(async this_client1=>{
// //     //console.log(this_client1);
// //     //let this_client = CircularJSON.parse(session_data);


// //     //// let this_client = myList[numId - 1];
    
// //     let this_client = myList[myindixes.indexOf(numId)];
// //     //console.log(this_client);

// //     if(apiToken !== Token){
// //         return res
// //         .status(401).json({status:"false",error:"This invalid Token"});
// //     }
// //         // انتظر لمدة 7 ثواني (7000 مللي ثانية)
// //         await wait(7000);  
// //         console.log('7 seconds later...');

// //     try {
// //         const result_A = await get_connect_spacific_A_only(id);
// //         if(result_A !== "NULL"){
// //             const user = await this_client.isRegisteredUser(phone);
// //             if(user){
// //                 ////////
// //                 ///////////
// //                 // let sections = [
// //                 //     {
// //                 //         title: 'القائمة الرئيسية',
// //                 //         rows: [
// //                 //             { id: '1', title: 'الخيار الأول', description: 'وصف الخيار الأول' },
// //                 //             { id: '2', title: 'الخيار الثاني', description: 'وصف الخيار الثاني' }
// //                 //         ]
// //                 //     },
// //                 //     {
// //                 //         title: 'قسم آخر',
// //                 //         rows: [
// //                 //             { id: '3', title: 'الخيار الثالث', description: 'وصف الخيار الثالث' },
// //                 //             { id: '4', title: 'الخيار الرابع', description: 'وصف الخيار الرابع' }
// //                 //         ]
// //                 //     }
// //                 // ];
// //                 let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
// //                 let list = new List('List body', 'btnText', sections, 'Title', 'footer');

// //                 // let list = new List(
// //                 //     "اختر من القائمة التالية:", // النص الرئيسي
// //                 //     "عرض الخيارات", // النص في الزر
// //                 //     sections,
// //                 //     "عنوان القائمة", // عنوان القائمة
// //                 //     "ملاحظة أسفل القائمة" // النص أسفل القائمة
// //                 // );
// //                 //////
// //                 /////
// //                 this_client.sendMessage(phone,list).then((result) => {
// //                     //console.log(result);
// //                     res.json({status:"true", response: {messageId : result.id.id, connect : phone ,message:list  }})
// //                     //res.json({status:"true", response: {messageId : result.id._serialized, connect : result.from ,message:message  }})
// //                 });
            
                
// //             }else{
// //                 res.json({status:"false", error:"this phone not registed in whatsapp"});
// //             }
    
// //             console.log(message);
// //             console.log(phone);
// //         }
// //         else{
// //             res.json({status:"false", error:"this Company is Disconnected From whatsapp"});
// //         }
        
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({status:"false",error:"Error Server"});
// //     }
// // //});
// // });
// // };

const test = async (req,res)=> {

    res.setTimeout(35000); // 35000 مللي ثانية (35 ثانية)
        // انتظر لمدة 3 ثواني (3000 مللي ثانية)
        await wait(3000);  
        console.log('3 seconds later...');

    try {

        res.json({status:"true", response: "hello مازن mazen New2 !!!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"false",error:"Error Server"});
    }
    
};


const isClientReady_data = async(req,res) =>{
    //console.log(client.info);

    const id = req.params.id || req.body.id;
    //client.removeAllListeners('qr'); // إزالة جميع المستمعين للحدث 'qr'

    //req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
    res.setTimeout(45000); // 45000 مللي ثانية (45 ثانية)

    //get_connect_Data('4006')
    get_connect_Data(id)
    .then((nresult) => {
        console.log('Product names:', nresult); // طباعة قائمة أسماء المنتجات
        console.log(nresult[0].connect_name); // طباعة قائمة أسماء المنتجات
        console.log(nresult[0].connect_mobile); // طباعة قائمة أسماء المنتجات
        res.json({
            status: true,
            message: 'Data fetched successfully',
            data: {name:nresult[0].connect_name,mobile:nresult[0].connect_mobile,deviceType:nresult[0].connect_deviceType,isBussenis:nresult[0].connect_isBussenis}
        });
    })
    .catch((error) => {
        //console.error('Error:', error);
        console.log('No Data as : its not connected'); // طباعة قائمة أسماء المنتجات
        res.status(200).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    });


};


const getThisImage = async(req,res) =>{
    const id = req.params.id || req.body.id;

    res.setTimeout(45000); // 45000 مللي ثانية (45 ثانية)

    try{
        let myid = id;
        let numId = Number(myid);
        console.log(id);
        console.log(myid);
        console.log(numId);
                
        let this_client = myList[myindixes.indexOf(numId)];
            // الحصول على رقم هاتف الحساب المتصل
        const myNumber = this_client.info.wid._serialized;

        // الحصول على صورة الملف الشخصي
        const profilePicUrl = await this_client.getProfilePicUrl(myNumber);

        if (profilePicUrl) {
            console.log('رابط صورة الملف الشخصي:',id," ", profilePicUrl);
            res.status(200).json({
                status: true,
                message: 'you get this Image',
                image: profilePicUrl
            });
        } else {
            console.log('لا توجد صورة ملف شخصي.');
        }
    }catch(error){
        //console.error('Error:', error);
        console.log('No Data as : getThisImage :',id); // طباعة قائمة أسماء المنتجات
        res.status(200).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    };
};


function generateQr(client_id){
        
    //let myid = client_id.substring(1);
    let myid = client_id;
    let numId = Number(myid);
    console.log(client_id);
    console.log(myid);
    console.log(numId);
    return new Promise((resolve, reject) => {
        let this_client  ;
        console.log('No session in qr');
        //// this_client = myList[numId - 1];
        this_client = myList[myindixes.indexOf(numId)];
       
        this_client.once('qr', async(qr) => {
        // Generate and scan this code with your phone
        try {
        resolve(qr); 

        } catch (error) {
            console.log(error);
            reject(error); 
        }

   });
});
};

    const generateQrCodeNew2 = async(req,res,next) =>{
        //console.log(client.info);
        const id = req.params.id || req.body.id;

        res.setTimeout(40000); // 40000 مللي ثانية (40 ثانية)

        generateQr(id)
        .then((result)=>{
            res.status(200).json({
                status: true,
                message: 'Data fetched successfully',
                response: {qr : result }
        });
        })
        .catch((error) => {
            //console.error('Error:', error);
            console.log('No Qr as : its connected before'); // طباعة قائمة أسماء المنتجات
            res.status(200).json({
                status: false,
                message: 'No Qr as : its connected before',
                error: error.message
            });
        });      
    }

    const addNew_Device = async(req,res) =>{
        const id = req.params.id || req.query.id || req.body.id;
        const company_name = req.params.name ||req.query.name || req.body.name;

        res.setTimeout(40000); // 40000 مللي ثانية (40 ثانية)

        setAllsessions_Initializing(id,"0")
        .then((result)=>{
            insert_company(id,company_name).then((result1)=>{
                get_last_connect_serial(id).then(serial=>{
                insert_connect_New(id ,'N',serial).then(result2=>{

                res.status(200).json({
                    status: true,
                    response: 'Device succesfully added',
            });
            }).catch((err1)=>{
                res.status(200).json({
                    status: false,
                    response: 'Error : ocured not adedd Device',
                    error: err1.message
                });
            })});
          }).catch((err2)=>{
            res.status(200).json({
                status: false,
                response: 'Error : ocured not adedd Device',
                error: err2.message
            });
          })
        })
        .catch((error) => {
            //console.error('Error:', error);
            console.log('Error : ocured not adedd Device'); // طباعة قائمة أسماء المنتجات
            res.status(200).json({
                status: false,
                response: 'Error : ocured not adedd Device',
                error: error.message
            });
        });      
    };
 
// حذف رسالة لدى الجميع
async function deleteMessageForEveryone(client_id,phone_id, messageId) {
        //let myid = client_id.substring(1);
        let myid = client_id;
        let numId = Number(myid);
        console.log(client_id);
        console.log(myid);
        console.log(numId);
        let this_client  ;
        //// this_client = myList[numId - 1];
        this_client = myList[myindixes.indexOf(numId)];

        return new Promise(async (resolve, reject) => {
           
            try {
                // جلب المحادثة
                const chat = await this_client.getChatById(phone_id);

                // جلب الرسالة المحددة
                const messages = await chat.fetchMessages({ limit: 50 });
                const messageToDelete = messages.find(msg => msg.id.id === messageId);
                console.log(messages);
                console.log(messageToDelete);
                if (messageToDelete) {
                    // استدعاء دالة حذف الرسالة
                    this_client.deleteMessage(phone_id, messageId);
                    console.log('Message deleted for everyone');
                    resolve("true");
                }
                else{
                    resolve("not true");
                }

            } catch (error) {
                console.error('Failed to delete message:', error);
                reject(error); 
            }
    
       });
};

// حذف رسالة لدى فقط
async function deleteMessageForMe(client_id,phone_id, messageId) {
    //let myid = client_id.substring(1);
    let myid = client_id;
    let numId = Number(myid);
    console.log(client_id);
    console.log(myid);
    console.log(numId);
    let this_client  ;
    //// this_client = myList[numId - 1];
    this_client = myList[myindixes.indexOf(numId)];
    //console.log(this_client);

    return new Promise(async (resolve, reject) => {
        try {
        // جلب المحادثة
        const chat = await this_client.getChatById(phone_id);

        // جلب الرسالة المحددة
        const messages = await chat.fetchMessages({ limit: 50 });
        const messageToDelete = messages.find(msg => msg.id.id === messageId);
        console.log(messages);
        console.log(messageToDelete);
        if (messageToDelete) {
            // استدعاء دالة حذف الرسالة
            this_client.deleteMessage(phone_id, messageId, { revoke: true });
            console.log('Message deleted for me');
            resolve("true");
        }
        else{
            resolve("not true");
        }
        } catch (error) {
            console.error('Failed to delete message:', error);
            reject(error); 
        }

    });
};
    
async function checkReciver_isConnected(client_id,phone){
        
    //let myid = client_id.substring(1);
    let myid = client_id;
    let numId = Number(myid);
    console.log(client_id);
    console.log(myid);
    console.log(numId);
    return new Promise(async (resolve, reject) => {
        let this_client  ;
    
        try {
        console.log('checkReciver_isConnected');
        //// this_client = myList[numId - 1];
        this_client = myList[myindixes.indexOf(numId)];
       
        const user = await this_client.isRegisteredUser(phone);
        if(user){
            resolve("true");         
        }else{
            resolve("Null"); 
        }

        } catch (error) {
            console.log(error);
            reject(error); 
        }

   });
};

    const deleteMessage= async(req,res) =>{
        //console.log(client.info);
        let id = req.query.id || req.body.id;
        let phone = req.query.phone || req.body.phone;
        let messageID = req.query.messageID || req.body.messageID;
        let forMe = req.query.forMe || req.body.forMe;

        phone = phone + "@c.us";

        res.setTimeout(40000); // 40000 مللي ثانية (40 ثانية)
        if(forMe===1 || forMe =="1"){
            deleteMessageForMe(id,phone,messageID)
            .then((result)=>{
                if(result == "true"){
                    res.status(200).json({status:"true", response: {message : "this message is deleted from whatsapp successfully"  }})
                }
                else{
                    res.status(200).json({status:"false", error:"this message is not found in whatsapp"});
                }
            })
            .catch((error) => {
                //console.error('Error:', error);
                console.log('deleteMessageForMe : Server Error'); 
                res.status(200).json({
                    status: false,
                    message: 'deleteMessageForMe : Server Error',
                    error: error.message
                });
            }); 
        }
        else{
            deleteMessageForEveryone(id,phone,messageID)
            .then((result)=>{
                if(result == "true"){
                    res.status(200).json({status:"true", response: {message : "this message is deleted from whatsapp successfully"  }})
                }
                else{
                    res.status(200).json({status:"false", error:"this message is not found in whatsapp"});
                }
            })
            .catch((error) => {
                //console.error('Error:', error);
                console.log('deleteMessageForEveryone : Server Error'); 
                res.status(200).json({
                    status: false,
                    message: 'deleteMessageForEveryone : Server Error',
                    error: error.message
                });
            }); 
        }   
    };

    const checkReciver = async(req,res) =>{
        //console.log(client.info);
        let id = req.query.id || req.body.id;
        let phone = req.query.phone || req.body.phone;

        phone = phone + "@c.us";

        res.setTimeout(40000); // 40000 مللي ثانية (40 ثانية)

        checkReciver_isConnected(id,phone)
        .then((result)=>{
            if(result == "true"){
                res.status(200).json({status:"true", response: {message : "this phone is registered in whatsapp"  }})
            }
            else{
                res.status(200).json({status:"false", error:"this phone not registered in whatsapp"});
            }
        })
        .catch((error) => {
            //console.error('Error:', error);
            console.log('checkReciver : Server Error'); 
            res.status(200).json({
                status: false,
                message: 'checkReciver : Server Error',
                error: error.message
            });
        });      
    };

    
function make_logout(client_id){
        
    //let myid = client_id.substring(1);
    let myid = client_id;
    let numId = Number(myid);
    console.log(client_id);
    console.log(myid);
    console.log(numId);
    return new Promise(async(resolve, reject) => {
        let this_client  ;
        console.log('No session in qr');
        //// this_client = myList[numId - 1];
        this_client = myList[myindixes.indexOf(numId)];
       
        try {
            await this_client.logout();
            //await wait(20000);
            resolve("Done");

        } catch (error) {
            console.log(error);
            reject(error); 
        }
});
};

    const logout_whats = async(req,res,next) =>{
        //console.log(client.info);
        const id = req.params.id || req.body.id;

        res.setTimeout(40000); // 40000 مللي ثانية (40 ثانية)

        make_logout(id)
        .then((result)=>{
            console.log('logout successfully: ',id); 
            res.status(200).json({
                status: true,
                message: 'logout successfully',
        });
        })
        .catch((error) => {
            //console.error('Error:', error);
            console.log('Error : logout not Done: ',id); 
            res.status(200).json({
                status: false,
                message: 'Error : logout not Done',
                error: error.message
            });
        });      
    }


module.exports = {sendMedia_by_url,sendMedia_by_file,sendMessage_text,test,isClientReady_data,generateQrCodeNew2,addNew_Device,testUpload,checkReciver,deleteMessage,logout_whats,getThisImage};


