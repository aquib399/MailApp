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
    flag = false;

app.get("/", (req, res) => {
    flag = false;
    res.sendFile(__dirname + "/pages/home.html");
});

app.post("/send", async (req, res) => {
    mail = req.body.mail;
    try {
        if (await db.findOne({ mail })) {
            throw { status: 302 };
            return;
        }
        otp = await require("./scripts/mail").sendMail(mail);
        flag = true;
        res.send({ status: 200 });
    } catch (e) {
        res.send({ status: e.status || 500 });
    }
});
app.post("/insert", async (req, res) => {
    if (!flag) {
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
            flag = false;
            res.send({ status: 200 });
        } catch (e) {
            res.send({ status: 500 });
        }
        return;
    }
    res.send({ status: 401 });
});

app.listen(process.env.PORT);
