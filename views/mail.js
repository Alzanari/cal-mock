const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sender = require("../config/mail");
const db = require("../models");
const Event = db.Event;
const User = db.User;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sender.user,
        pass: sender.pass
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

const mailOptions = {
    from: "gutshellsing666@gmail.com",
    to: "hellsing-666@hotmail.fr",
    subject: "testing nodemailer",
    template: '2daysB',
    context: {
        event_name: "Best Even ever",
        event_username: "alucard",
        event_date: "26-09-2022"
    }
};

exports.sendEmail = function (from, to, subject, callback) {

    var email = {
        from: "gutshellsing@gmail.com",
        to: "sscuaknewkdghvkuxi@kvhrr.com",
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