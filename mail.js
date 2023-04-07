require("dotenv").config();
const { createTransport } = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESHTOKEN });

exports.sendMail = async function sendMail(recipient) {
    const accessToken = OAuth2_client.getAccessToken();
    const transport = createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
            accessToken: accessToken,
        },
    });
    const otp = Math.floor(Math.random() * 89999 + 10000);
    const option = {
        from: ``,
        to: recipient,
        subject: "Mail App",
        text: "",
        html: getHtml(otp),
    };
    await transport.sendMail(option);
    return otp;
};
function getHtml(otp) {
    return `<div style="font-family: Enriqueta; min-width: 1000px; overflow: auto; line-height: 2">
        <div style="margin: 50px; width: 70%; padding: 20px 0">
            <div style="border-bottom: 1px solid #eee">
                <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Mail App</a>
            </div>
            <p style="font-size: 1.1em">Hi,</p>
            <p>Thank you for choosing Mail App</p>
            <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px; font-family: consolas">${otp}</h2>
            <p style="font-size: 0.9em">Regards,<br />Mail App</p>
            <hr style="border: none; border-top: 1px solid #eee" />
            <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                <p>Project Group 3</p>
                <p>BIT Mesra</p>
                <p>Ranchi</p>
            </div>
        </div>
    </div>
    `;
}
