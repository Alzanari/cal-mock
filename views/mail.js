const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sender = require("../config/mail");
const db = require("../models");
const Event = db.Event;
const User = db.User;

const myOAuth2Client = new OAuth2(
    sender.clientId,
    sender.clientSecret,
);

myOAuth2Client.setCredentials({
    refresh_token:sender.refreshToken
});

const myAccessToken = myOAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: sender.user,
         clientId: sender.clientId,
         clientSecret: sender.clientSecret,
         refreshToken: sender.refreshToken,
         accessToken: myAccessToken
    }
});

transporter.use('compile', hbs({
    viewEngine: {
      extname: '.handlebars',
      layoutsDir: './views/layouts',
      defaultLayout: false
    },
    viewPath: './views/layouts',
    extName: '.handlebars'
  }));


exports.sendEmail = function (from, to, subject, callback) {

    var email = {
        from: "gutshellsing@gmail.com",
        to: "alzanari@protonmail.com",
        subject: "testing nodemailer",
        template: '2daysB',
        context: {
            event_name: "Best Even ever",
            event_username: "alucard",
            event_date: "26-09-2022"
        }
    };

    transporter.sendMail(email, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
};