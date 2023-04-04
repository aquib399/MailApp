require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("MailApp").collection("data");
app.use(express.json());
app.use(express.static(__dirname));
// client.connect();
let otp;
let flag = false;
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});
app.post("/send", async (req, res) => {
    // if (await checkMail(req.body.mail)) {
    //     res.send({ status: "302" });
    //     return;
    // }
    try {
        otp = Math.floor(Math.random() * 89999 + 10000);
        console.table([{ mail: req.body.mail, otp }]);
        flag = true;
        res.send({ status: 200 });
    } catch (e) {
        res.send({ status: 301 });
    }
});
app.post("/insert", async (req, res) => {
    // if (await checkMail(req.body.mail)) {
    //     res.send({ status: "302" });
    //     return;
    // }
    if (!flag) {
        res.send({ status: 303 });
        return;
    }
    try {
        if (otp == req.body.otp) {
            // await db.insertOne({ mail: req.body.mail });
            flag = false;
            res.send({ status: 200 });
            return;
        }
        res.send({ status: 301 });
    } catch (e) {
        res.send({ status: 301 });
    }
});

async function checkMail(mail) {
    const res = db.findOne({ mail });
    if (res) return true;
    return false;
}
app.listen(process.env.PORT, console.log(`Listening at http://localhost:${process.env.port}`));
