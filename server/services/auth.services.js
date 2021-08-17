const bcrypt = require("bcrypt");
const salt = 10;
const {
  signupModel,
  loginModel,
  uploadPostModel,
  getAllPostModel,
  getPostsCategoryModel,
} = require("../models/auth.model");
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
    if (result !== null) {
      bcrypt.compare(tempPassword, result.password, function (errr, re, token) {
        if (errr) {
          callBackCon(err, null, null);
        } else {
          let token = jwt.sign({ email: email, password: password }, "token");
          callBackCon(null, re, token);
        }
      });
    } else {
      callBackCon(err, null, null);
    }
  });
}

async function postUploadService(post, callbackCon) {
  let status = await uploadPostModel(post, (error, res) => {
    if (error) {
      callbackCon(error, null);
    } else {
      callbackCon(null, res);
    }
  });
}

async function getAllPostsService(callBackCon) {
  await getAllPostModel((error, response) => {
    if (error) {
      callBackCon(error, null);
    } else {
      callBackCon(null, response);
    }
  });
}
async function getPostsCategoryService(callBackCon) {
  await getPostsCategoryModel((error, response) => {
    if (error) {
      callBackCon(error, null);
    } else {
      callBackCon(null, response);
    }
  });
}

module.exports = {
  signupService,
  loginService,
  postUploadService,
  getAllPostsService,
  getPostsCategoryService,
};
