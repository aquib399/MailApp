module.exports.getHtml = function (otp) {
    return `<div style="margin: auto; max-width: 600px; padding-top: 50px">
    <table width="100%">
        <tbody>
            <tr>
                <td style="background: #252f3d;; padding: 10px 0 10px 0; text-align: center">
                    <img
                        src="https://imgtr.ee/images/2023/04/08/kXKNQ.png"
                        width="70"
                        height="62"
                        alt="App logo"
                        border="0"
                        style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555"
                        data-bit="iit"
                    />
                </td>
            </tr>
        </tbody>
    </table>

    <table width="100%">
        <tbody>
            <tr>
                <td style="background-color: #fff; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px">
                    <h1 style="font-size: 20px; font-weight: bold; line-height: 1.3; margin: 0 0 15px 0">Verify your email address</h1>
                    <p style="margin: 0; padding: 0">
                        Thanks for starting the Mail App account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t
                        want to create an account, you can ignore this message.
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    style="
                        background-color: #fff;
                        color: #444;
                        font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
                        font-size: 14px;
                        line-height: 140%;
                        padding: 25px 35px;
                        padding-top: 0;
                        text-align: center;
                    "
                >
                    <div style="font-weight: bold; padding-bottom: 15px">Verification code</div>
                    <div style="color: #000; font-size: 36px; font-weight: bold; padding-bottom: 15px">${otp}</div>
                </td>
            </tr>
            <tr>
                <td
                    style="
                        background-color: #fff;
                        border-top: 1px solid #e0e0e0;
                        color: #777;
                        font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
                        font-size: 14px;
                        line-height: 140%;
                        padding: 25px 35px;
                    "
                >
                    <p style="margin: 0 0 15px 0; padding: 0 0 0 0">MailApp will never email you and ask you to disclose or verify your password, credit card, or banking account number.</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;
};
