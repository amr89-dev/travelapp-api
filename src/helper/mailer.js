const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: `${NODEMAILER_EMAIL}`,
    pass: `${NODEMAILER_PASSWORD}`,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
module.exports = transporter;
