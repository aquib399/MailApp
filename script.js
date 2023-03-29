const sendBtn = document.getElementById("sendBtn");
const checkBtn = document.getElementById("checkBtn");
const pg = document.querySelector("p");
const mail = document.getElementById("mail");
const otp = document.getElementById("otp");
const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
};

sendBtn.addEventListener("click", async () => {
    console.log("Sending mail to : ", mail.value);
    type.body = JSON.stringify({ mail: mail.value });
    const res = await fetch("/submit", type);
    const data = await res.json();
    if (data.status == "found") {
        console.log("Mail already registered");
        return;
    }
    if (data.status == "error") {
        console.error("Error whlie sending email to", mail.value);
        return;
    }
    console.log("Sent successfully", JSON.stringify(data));
});

checkBtn.addEventListener("click", async () => {
    console.log("Verifying OTP");
    try {
        const res = await fetch("/getOtp", type);
        const data = await res.json();
        if (otp.value == data.otp) {
            const r = await fetch("/insert", type);
            const d = await r.json();
            if (d.status == "found") {
                console.log("Mail already registered");
                return;
            }
            if (d.status == "error") {
                console.error("Error while registering");
            }
            console.log("Inserted into database");
        } else {
            console.error("Invalid OTP");
        }
    } catch (e) {
        console.error(e);
    }
});
(() => {
    const msg = "Welcome to Mail App";
    const len = msg.length;
    let str = "";
    let cnt = 0;
    const x = setInterval(() => {
        len > cnt ? ((str += msg[cnt++]), (pg.innerHTML = str + "_")) : (clearInterval(x), (pg.innerHTML = str));
    }, 80);
})();
