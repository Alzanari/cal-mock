const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sender = require("../config/mail");
const db = require("../models");
const Event = db.Event;
const User = db.User;

const myOAuth2Client = new OAuth2(sender.clientId, sender.clientSecret);

myOAuth2Client.setCredentials({
  refresh_token: sender.refreshToken,
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
    accessToken: myAccessToken,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "./views/layouts",
      defaultLayout: false,
    },
    viewPath: "./views/layouts",
    extName: ".handlebars",
  })
);

exports.sendEmail = function (from, to, subject, callback) {
  async function pending() {
    const events = await Event.findAll({
      where: {
        status: "pending",
      },
    });
    // console.log(Object.keys(db.Event.prototype));
    events.forEach(async (event) => {
      const user = await event.getUser();
      const userRec = user.dataValues;
      let date1 = new Date(JSON.stringify(event.dataValues.end).substr(1, 24));
      let day1 = new Date(Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate()));
      let date2 = new Date();
      let day2 = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()));
      let diffDays = parseInt((day2 - day1) / (1000 * 60 * 60 * 24));
      let template = "";
      switch (diffDays) {
        case -2:
          template = "2daysB";
          break;
        case -1:
          template = "1dayB";
          break;
        case 1:
          template = "1daysA";
          break;
        default:
          break;
      }
      if (template) {
        email(template, userRec, event.dataValues);
      }
    });
  }

  pending();
  function email(template, user, event) {
    let email = {
      from: "gutshellsing@gmail.com",
      to: user.email,
      subject: "testing nodemailer",
      template: template,
      context: {
        event_name: event.title,
        event_username: user.username,
        event_date: event.end,
      },
    };
    transporter.sendMail(email, function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      // console.log(info);
    });
  }
  //   var email = {
  //     from: "gutshellsing@gmail.com",
  //     to: "alzanari@protonmail.com",
  //     subject: "testing nodemailer",
  //     template: "2daysB",
  //     context: {
  //       event_name: "Best Even ever",
  //       event_username: "alucard",
  //       event_date: "26-09-2022",
  //     },
  //   };

  //     transporter.sendMail(email, function (error, info) {
  //       if (error) throw Error(error);
  //       console.log("Email Sent Successfully");
  //       console.log(info);
  //     });
};
