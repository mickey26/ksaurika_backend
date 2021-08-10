const bcrypt = require("bcrypt");
const salt = 10;
const { signupModel, loginModel } = require("../models/auth.model");
var jwt = require("jsonwebtoken");

async function signupService(email, username, password, callBackCon) {
  await signupModel(email, username, password, (error, result) => {
    if (result) {
      callBackCon(null, result);
    } else {
      callBackCon(error, null);
    }
  });
}

async function loginService(email, password, callBackCon) {
  let tempPassword = password;
  const status = await loginModel(email, password, (result, err) => {
    console.log(result, "condition result");
    if (result !== null) {
      bcrypt.compare(tempPassword, result.password, function (errr, re, token) {
        if (errr) {
          console.log(errr, "encrut");
          callBackCon(err, null, null);
        } else {
          console.log(re, "encrut");
          let token = jwt.sign({ email: email, password: password }, "token");
          console.log(token, "token");
          callBackCon(null, re, token);
        }
      });
    } else {
      callBackCon(err, null, null);
    }
  });
}

module.exports = {
  signupService,
  loginService,
};
