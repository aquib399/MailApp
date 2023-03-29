require("dotenv").config();
const mail = require("./mail.js");
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("MailApp").collection("data");
app.use(express.json());
app.use(express.static(__dirname));
client.connect();
let otp = 10000;
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/submit", async (req, res) => {
    try {
        const reply = await db.findOne(req.body);
        if (reply) {
            console.table({ status: "found" });
            res.send({ status: "found" });
            return;
        }
        otp = await mail.sendMail(req.body.mail);
        console.table("otp is :", otp);
        res.send({ status: "sent" });
    } catch (e) {
        console.table({ status: "error" });
        res.send({ status: "error" });
    }
});
app.post("/insert", async (req, res) => {
    try {
        const reply = await db.findOne(req.body);
        if (reply) {
            console.table({ status: "found" });
            res.send({ status: "found" });
            return;
        }
        await db.insertOne(req.body);

        console.table({ status: "inserted" });
        res.send({ status: "inserted" });
    } catch (e) {
        console.table({ status: "error" });
        res.send({ status: "error" });
    }
});
app.post("/getOtp", (req, res) => {
    console.table({ otp: otp });
    res.send({ otp: otp });
});
app.listen(process.env.PORT);
