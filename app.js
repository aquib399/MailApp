require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("MailApp").collection("data");
app.use(express.json());
app.use(express.static(__dirname));
client.connect();
let mail,
    otp,
    dt,
    flag = false,
    sent = false;
function checkTime() {
    let tmp = Date.now();
    if (tmp - 30000 >= dt) {
        return false;
    }
    return 30000 - (tmp - dt);
}
app.get("/", (req, res) => {
    sent = false;
    res.sendFile(__dirname + "/pages/home.html");
});
app.get("/clip", (req, res) => {
    res.sendFile(__dirname + "/pages/clip.html");
});
app.post("/send", async (req, res) => {
    mail = req.body.mail;
    let time = checkTime();
    try {
        if (sent && time) {
            throw { status: 412, time };
        }
        if (await db.findOne({ mail })) {
            throw { status: 302 };
        }
        otp = await require("./scripts/mail").sendMail(mail);
        console.log(otp);
        sent = true;
        dt = Date.now();
        res.send({ status: 200 });
    } catch (e) {
        res.send({ status: e.status || 500, time: Math.round(e.time / 1000) });
    }
});
app.post("/insert", async (req, res) => {
    if (!sent) {
        res.send({ status: 203 });
        return;
    }
    if (otp == req.body.otp) {
        try {
            if (await db.findOne({ mail })) {
                res.send({ status: 302 });
                return;
            }
            await db.insertOne({ mail });
            sent = false;
            res.send({ status: 200 });
        } catch (e) {
            res.send({ status: 500 });
        }
        return;
    }
    res.send({ status: 401 });
});

app.listen(process.env.PORT);
