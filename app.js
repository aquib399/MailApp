require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("MailApp").collection("data");
app.use(express.json());
app.use(express.static(__dirname));
client.connect().then(console.log(`Connected`));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/submit", async (req, res) => {
    try {
        const reply = await db.findOne(req.body);
        if (reply) {
            res.send({ staus: 302 });
            return;
        }
        await db.insertOne(req.body);
        res.send({ staus: 200 });
    } catch (e) {
        res.send({ staus: 503 });
    }
});
app.listen(process.env.PORT, console.log(`Listening at http://localhost:${process.env.PORT}`));
