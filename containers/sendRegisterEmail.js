const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const { userName, email } = data;
  let transporter = nodemailer.createTransport({
    name: "localhost",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PSSWRD,
    },
  });
  const message = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "♥Foodcrush♥",
    text: `Hi ${userName}, welcome to Foodcrush`,
  };
  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }
    transporter.close();
  });
};

module.exports = sendEmail;
