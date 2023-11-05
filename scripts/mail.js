const { createTransport } = require("nodemailer");
exports.sendMail = async function sendMail(recipient) {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
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
