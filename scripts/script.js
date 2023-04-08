const mail = document.getElementById("mail");
const otp = document.getElementById("otp");
const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
};

async function sendMail() {
    type.body = JSON.stringify({ mail: mail.value });
    const res = await fetch("../send", type);
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
}
async function checkOtp() {
    type.body = JSON.stringify({ otp: otp.value });
    const res = await fetch("../insert", type);
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
}

(() => {
    const pg = document.querySelector("p");
    const msg = "Welcome to Mail App";
    let str = "",
        cnt = 0;
    const x = setInterval(() => {
        msg.length > cnt ? ((str += msg[cnt++]), (pg.innerHTML = str + "_")) : (clearInterval(x), (pg.innerHTML = str));
    }, 80);
})();
