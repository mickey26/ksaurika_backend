const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password",
  database: "ksaurika",
});

module.exports = { connection };
