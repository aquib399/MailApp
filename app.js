require("dotenv").config();
const e = require("express");
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("MailApp").collection("data");
app.use(express.json());
app.use(express.static(__dirname));
client.connect();
let data = {};
function checkTime(mail) {
    let temp = Date.now();
    if (temp - 30000 > data[mail].time) {
        //Can send
        return false;
    }
    //Can not send
    let remaining = Math.round((30000 - (temp - data[mail].time)) / 1000);
    return remaining;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
});

app.post("/send", async (req, res) => {
    let mail = req.body.mail;
    try {
        //check if the otp was sent or not
        if (data[mail]) {
            //check if 30 seconds are passed or not
            const time = checkTime(mail);
            if (time) {
                //Cant send because its already sent
                // console.log("Please wait", time, "seconds");
                //Send response as already sent and the time remaining
                throw { status: 412, time };
                return;
            }
        }
        //check if the mail exist in the database or not
        if (await db.findOne({ mail })) {
            // console.log("Already exist");
            throw { status: 302 };
            return;
        }
        //create a instance(mail's details) in the data object
        data[mail] = {};
        // data[mail].otp = Math.floor(Math.random() * 89999 + 10000);
        data[mail].otp = await require("./scripts/mail").sendMail(mail);
        data[mail].time = Date.now();
        // console.log("Mail sent at->", mail, data[mail].otp);
        //Send response as 'Mail sent'
        throw { status: 200 };
    } catch (e) {
        res.send({ status: e.status || 500, time: e.time });
    }
});
app.post("/insert", async (req, res) => {
    //Gather the body data
    let mail = req.body.mail;
    let otp = req.body.otp;
    try {
        //check if the mail exist in the database or not
        if (await db.findOne({ mail })) {
            // console.log("Already exist");
            throw { status: 302 };
        }
        //check the corrosponding body.data from data object
        if (data[mail].otp == otp) {
            //OTP verified
            await db.insertOne({ mail });
            delete data[mail];
            // console.log("Verified & inserted");
            //send response as successfully inserted
            throw { status: 200 };
        }
        //Not verfied
        // console.log("Wrong otp");
        // send response as not verfied
        throw { status: 401 };
    } catch (e) {
        res.send({ status: e.status });
    }
});
app.listen(3000, () => {
    console.clear();
    // console.log("http://localhost:3000");
});

//For deleting the mail's details if not verfied in 30 seconds in every 5 minutes
setInterval(() => {
    let temp = Date.now();
    Object.entries(data).forEach(([key, val]) => {
        // console.log({ key, val });
        if (temp - 30000 > val.time) {
            delete data[key];
        }
    });
    // console.log();
}, 300000);
