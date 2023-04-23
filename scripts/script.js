const Mail = document.getElementById("mail");
const otp = document.getElementById("otp");
let m = false;
const type = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
};
async function sendMail() {
    const mail = Mail.value;
    if (!mail.includes("@") && mail.length >= 5) {
        alert("Please enter a valid mail");
        return;
    }
    type.body = JSON.stringify({ mail });
    const res = await fetch("../send", type);
    const data = await res.json();
    if (data.status == 412) {
        alert("Please wait " + data.time + " seconds before sending again");
        return;
    }
    if (data.status == 302) {
        document.write(thank(`Thank you...<br>The mail is already registered`));
        return;
    }
    if (data.status == 500) {
        alert("Error while sending mail...Please check the mail again..");
        return;
    }
    m = mail;
    alert("OTP sent");
}
async function checkOtp() {
    if (!m) {
        alert("Send OTP First");
        return;
    }
    type.body = JSON.stringify({ mail: m, otp: otp.value });
    const res = await fetch("../insert", type);
    const data = await res.json();
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
    document.write(thank("Thank you for being part of us"));
}

(() => {
    const pg = document.querySelector("p");
    const msg = "Welcome to Mail App";
    let str = "",
        cnt = 0;
    const x = setInterval(() => {
        msg.length > cnt ? ((str += msg[cnt++]), (pg.innerHTML = str + String.fromCharCode(Math.floor(Math.random() * 89 + 33)))) : (clearInterval(x), (pg.innerHTML = str));
    }, 70);
})();
function thank(msg) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Thank You</title>
        </head>
        <body style="background-color: black; display: flex; justify-content: center; align-items: center; min-height: 90vh">
            <div class="container" style="display: flex; justify-content: center; text-align: center">
                <div class="item">
                    <img src="../pages/tick.png" alt="" width="70px" />
                    <p id="tnk" style="font-family: Montserrat; font-size: large; color: white; text-shadow: 0px 0px 50px white; -webkit-box-reflect: below 0px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1))"></p>
                </div>
            </div>
            <footer style="position: fixed; bottom: 10%">
                <a href="https://www.instagram.com/aquib399" target="_blank">
                    <img src="../pages/insta.png" alt="Instagram" style="filter: invert(100%); margin: 3px; width: 35px" />
                </a>
                <a href="https://www.linkedin.com/in/aquib-alam/" target="_blank">
                    <img src="../pages/linked.png" alt="Linkedin" style="filter: invert(100%); margin: 3px; width: 35px" />
                </a>
            </footer>
        </body>
    </html>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
        ::selection {
            background-color: white;
            color: black;
        }
        a:link {
            text-decoration: none;
        }
        a:visited {
            text-decoration: none;
        }
        a:hover {
            text-decoration: none;
        }
        a:active {
            text-decoration: none;
        }
    </style>
    <script>
        (() => {
            const pg = document.getElementById("tnk");
            const msg = "${msg}";
            let str = "",
                cnt = 0;
            function ran() {
                return String.fromCharCode(Math.floor(Math.random() * 89 + 33));
            }
            const x = setInterval(() => {
                msg.length > cnt ? ((str += msg[cnt++]), (pg.innerHTML = str + ran() + ran() + ran())) : (clearInterval(x), (pg.innerHTML = str));
            }, 70);
        })();
    </script>
    `;
}
