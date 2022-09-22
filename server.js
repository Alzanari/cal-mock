const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const rt = require("./routes");
const db = require("./models");

// enable express to do Cross-origin resource sharing
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/z-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());


// connect to mysql database
db.sequelize.sync().then(() => {
    console.log("Synced the database");
}).catch((error) => {
    console.log("Failed to sync the db: ", error.message);
})



app.get('/', (req, res) => res.send("hello world"));

// app port
app.listen(3000, () => {
    console.log("server.js is running at port 3000 !");
})