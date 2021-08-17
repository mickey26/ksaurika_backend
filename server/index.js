const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8080;
const app = express();
const bcrypt = require("bcrypt");
const salt = 10;
const mysql = require("mysql");
const { json } = require("body-parser");
// const { signup } = require("./controllers/auth.controller");
const auth = require("./routes/auth.routes");
const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password",
  database: "ksaurika",
});

connection.connect((err) => {
  if (err) {
    return console.error("ERROR: " + err.message);
  }
  console.log("Connected to MySQL Server!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/auth", auth);

app.get("/login_auth", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(password, "popo");
  let query = `SELECT email,password FROM signup_user_tb WHERE EMAIL = "${email}";`;
  console.log(query, "query");
  connection.query(query, (error, results) => {
    let temp = JSON.stringify(...results);
    let hashedPassword = JSON.parse(temp);
    console.log(hashedPassword.password, "okkkk");
    bcrypt.compare(password, hashedPassword.password, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
