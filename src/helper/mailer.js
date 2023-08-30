const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 456,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP is ready");
  }
});

module.exports = transporter;
