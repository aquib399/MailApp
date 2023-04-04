require("dotenv").config();
const { createTransport } = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.clientID, process.env.clientSecret);
OAuth2_client.setCredentials({ refresh_token: process.env.refreshToken });

exports.sendMail = async function sendMail(recipient) {
    const accessToken = OAuth2_client.getAccessToken();
    const transport = createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.user,
            clientId: process.env.clientID,
            clientSecret: process.env.clientSecret,
            refreshToken: process.env.refreshToken,
            accessToken: accessToken,
        },
    });
    const otp = Math.floor(Math.random() * 89999 + 10000);
    const option = {
        from: `Project@nazi.com`,
        to: recipient,
        subject: "Mail App",
        text: "",
        html: `<h1>Thank you for using our app<br/>Your OTP is ${otp}</h1>`,
    };
    await transport.sendMail(option);
    return otp;
};