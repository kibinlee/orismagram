import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// console.log(process.env.SENDGRID_USERNAME);
// console.log(process.env.SENDGRID_PASSWORD);

const sendMail = email => {
  const options = {
    // auth: {
    //   api_user: "SENDGRID_USERNAME",
    //   api_key: "SENDGRID_PASSWORD"
    // }
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  // console.log(options);
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  console.log(adress, secret);
  const email = {
    from: "kbl@prisma.com",
    to: adress,
    subject: "Login Secret for Orismagram 🔐",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> Copy paste on the app/website to login`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
