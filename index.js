const express = require('express')
const cors = require('cors')

const app = express()
const path = require('path');

app.use(cors())

// app.use(cors({
//   origin: 'https://yourdomain.com', // ضع هنا الأصل المسموح به
//   credentials: true
// }));
const compression = require('compression')
app.use(compression())


const port = process.env.port || 3000
const bodyParser = require('body-parser')
const EventEmitter = require('events');

// زيادة الحد الأقصى الافتراضي لكل EventEmitter إلى 20
EventEmitter.defaultMaxListeners = 45;

// app.use((req, res, next) => {
//   const timeout = 30000; // 30000 مللي ثانية = 30 ثواني
//   res.setTimeout(timeout, () => {
//       console.log('Request has timed out.');
//       //res.status(503).send({status:"false",response:'Request timed out.'});
//       res.status(200).send({status:"false",response:'Request timed out.'});
//   });

//   next();
// });

////--------------------

// app.use((req, res, next,reject) => {
//   const timeout = 5000; // 30000 مللي ثانية = 30 ثواني
//   res.setTimeout(timeout, () => {
//       console.log('Request has timed out.');
//       //res.status(503).send({status:"false",response:'Request timed out.'});
//       reject(new Error("QR event wasn't emitted in 30 seconds."));
//       //({status:"false",response:'Request timed out.'});
//   });

//   next();
// });

const routerpath = path.join(__dirname, './routers/wa');

const router = require(routerpath);


const fs = require('fs');
const logFile = fs.createWriteStream('./errors/error.txt', { flags: 'a' });

process.on('generateQrCodeNew', (err) => {
    logFile.write(`[${new Date().toISOString()}] ${err.stack}\n`);
    process.exit(1);
});

//const router = require("./routers/wa");
app.use("/",router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.setTimeout(10000); // 10000 مللي ثانية (10 ثانية)
  res.setTimeout(35000); // 35000 مللي ثانية (35 ثانية)
  next();
});

// السماح لـ Express بفهم البيانات المرسلة من النماذج
app.use(express.urlencoded({ extended: true }));

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})