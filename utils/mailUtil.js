const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "juniorhodor279@gmail.com",
    pass: "nmtnnmewbroudvds",
  },
});

module.exports.sendOTP = async (to, otp) => {
  try {
    let info = await transporter.sendMail({
      to,
      subject: "One Time Password (OTP) to verify your account on RoomZap",
      text: "RoomZap - Verify your account",
      html: `Dear User, <br> Your One Time Password (OTP) for verifying your account on RoomZap is <h4>${otp}</h4>
      Please note, this OTP is valid only for 10minutes and cannot be used then. <br> Please do not share this One Time Password with anyone.`,
    });
    console.log("Message sent to admin: %s", info.messageId);
  } catch (e) {
    console.log("Error: " + e);
  }
};
