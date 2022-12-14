const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");
const db = require("./models");
const cron = require("node-cron");
const send = require("./views/mail");

// enable express to do Cross-origin resource sharing
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/z-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

// connect to mysql database
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced the database");
  })
  .catch((error) => {
    console.log("Failed to sync the db: ", error.message);
  });

// routes
const authR = require("./routes/auth");
const userR = require("./routes/users");
const eventR = require("./routes/event");

app.use("/api/auth", authR);
app.use("/api/user", userR);
app.use("/api/event", eventR);

// Schedule mail delivery everyday at 10:00 am (0 10 * * *)
const mailJob = new cron.schedule(" 0 10 * * *", () => {
  send.sendEmail();
});
mailJob.start();

// check model object magic methods
// console.log(Object.keys(db.User.prototype));
// console.log(db);

// app port
app.listen(3000, () => {
  console.log("server.js is running at port 3000 !");
});
