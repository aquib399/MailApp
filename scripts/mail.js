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
        html: require("./screen").getHtml(otp),
    };
    await transport.sendMail(option);
    return otp;
};
