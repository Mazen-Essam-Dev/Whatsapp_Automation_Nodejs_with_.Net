const fs = require('fs');

const path2 = require('path');
const { stringify, parse } = require('flatted');

function wait2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// وظيفة لحفظ الجلسة إلى ملف
function save_file_Session(session_data,id) {
    let sessionFile = path2.join(__dirname, '../sessions/session_'+id+'.json'); // مكان تخزين الجلسة
    return new Promise(async(resolve, reject) => {    
        try {
            //fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
            fs.writeFileSync(sessionFile, session_data);
            resolve("Done");

        } catch (error) {
            console.log('Error: save_file_Session: ',id,error);
            reject(error);
        }
});
    //fs.writeFileSync(sessionFile, session);
}

// وظيفة لتحميل الجلسة من ملف
function load_file_Session(id) {
    let sessionFile = path2.join(__dirname, '../sessions/session_'+id+'.json'); // مكان تخزين الجلسة
    return new Promise(async(resolve, reject) => {    
        if(sessionFile){
        try {
            if (fs.existsSync(sessionFile)) {
                const sessionData = fs.readFileSync(sessionFile, 'utf-8');
                //resolve(JSON.parse(sessionData));
                //resolve(CircularJSON_2.stringify(sessionData));
                resolve(parse(sessionData));
            }
        } catch (error) {
            console.log('Error: load_file_Session: ',id," ",error);
            reject(error); 
        }
    }
    reject("No File"); 
});
}



async function remove_file_Session(id) {

    let sessionFile = path2.join(__dirname, '../sessions/session_'+id+'.json');
    if (sessionFile) {
        console.log(sessionFile);
        await fs.promises.rm(sessionFile, { recursive: true, force: true })
            .catch((e) => {
                throw new Error(e);
            });
        console.log("I Deleted file session succesfully: ",id );
    }
    //fs.unlinkSync(sessionFile); // حذف ملف الجلسة إذا فشلت المصادقة
}

async function removeSession(id) {
    console.log("wait 13 seconds");
    await wait2(13000);
    console.log("finished waited 13 seconds");
    //let sessionFile = '../sessions_saved/session_'+id+'.json'; // مكان تخزين الجلسة
    //let sessionFile = '../.wwebjs_auth/session-client_'+id; // مكان تخزين الجلسة
    let sessionFile = path2.join(__dirname, '../.wwebjs_auth/session-client_'+id);
        //if (sessionFile) {
        console.log(sessionFile);
        await fs.promises.rm(sessionFile, { recursive: true, force: true })
            .catch((e) => {
                throw new Error(e);
            });
        console.log("I Deleted Folder session succesfully");
    //}
    //fs.unlinkSync(sessionFile); // حذف ملف الجلسة إذا فشلت المصادقة
}

module.exports = { removeSession ,save_file_Session,load_file_Session,remove_file_Session};


