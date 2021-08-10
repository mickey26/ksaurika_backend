const bcrypt = require("bcrypt");
const salt = 10;
const { connection } = require("../db/dbConfig");

async function signupModel(email, username, password, callBack) {
  let checkQuery = `SELECT * FROM signup_user_tb WHERE EMAIL = "${email}" OR USERNAME = "${username}";`;
  connection.query(checkQuery, (error, result) => {
    if (error) {
      error = {
        status: 400,
        message: "something Went Wrong",
      };
      callBack(error, null);
    } else if (result.length > 0) {
      error = {
        status: 406,
        message: "User Already exist",
      };
      callBack(error, null);
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          error = {
            status: 405,
            message: "User cant be added",
          };
          callBack(err, null);
        } else {
          const que = `INSERT INTO signup_user_tb(email,username,password) VALUES ( "${email}", "${username}", "${hash}")`;
          connection.query(que, (error, results) => {
            if (error) {
              error = {
                status: 409,
                message: "User cant be added",
              };
              callBack(error, null);
            } else {
              callBack(null, true);
            }
          });
        }
      });
    }
  });
}

async function loginModel(email, password, callback) {
  let query = `SELECT email,password FROM signup_user_tb WHERE EMAIL = "${email}";`;
  connection.query(query, (error, result) => {
    if (error) {
      callback(null, error);
    } else if (result.length > 0) {
      var temp = JSON.stringify(...result);
      temp = JSON.parse(temp);
      callback(temp, null);
    } else {
      callback(null, error);
    }
  });
}

module.exports = {
  signupModel,
  loginModel,
};
