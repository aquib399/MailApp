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
    type.body = JSON.stringify({ mail: mail.value });
    const res = await fetch("/send", type);
    const data = await res.json();
    if (data.status == 302) {
        alert("Mail Already Registered");
        return;
    }
    if (data.status == 500) {
        alert("Error while sending mail...Please check the mail again..");
        return;
    }
    alert("OTP sent");
});
checkBtn.addEventListener("click", async () => {
    type.body = JSON.stringify({ otp: otp.value });
    const res = await fetch("/insert", type);
    const data = await res.json();
    if (data.status == 203) {
        alert("Send OTP First");
        return;
    }
    if (data.status == 401) {
        alert("Wrong OTP");
        return;
    }
    if (data.status == 302) {
        alert("Mail Already Registered");
        return;
    }
    if (data.status == 500) {
        alert("Error while Verifying");
        return;
    }
    alert("OTP Verified");
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
