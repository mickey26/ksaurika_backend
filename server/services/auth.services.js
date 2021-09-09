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
const fs = require("fs");
const AWS = require("aws-sdk");
const { buffer } = require("buffer");
const FileType = require("file-type");

const s3 = new AWS.S3({
  accessKeyId: "AKIA2QJIMFUZRUJPYXFA",
  secretAccessKey: "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",
});

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
    console.log(result, "resultQuery");
    if (result !== null) {
      bcrypt.compare(tempPassword, result.password, function (errr, re, token) {
        if (errr) {
          callBackCon(err, null, null, null, null);
        } else {
          let token = jwt.sign({ email: email, password: password }, "token");
          callBackCon(null, re, token, result.user_id, result.user_name);
        }
      });
    } else {
      callBackCon(err, null, null, null, null);
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
async function photoUploadAws(data, callBack) {
  const fileStream = fs.readFileSync(data.path);
  const type = await FileType.fromBuffer(fileStream);

  const param = {
    Bucket: "ksaurika-images",
    Key: data.filename,
    Body: fileStream,
    ContentType: type.mime,
    ACL: "public-read",
  };

  s3.upload(param, (err, data) => {
    console.log(data, "s4");
    if (err) {
      callBack(err, null);
    } else {
      callBack(null, data);
    }
  });
}

module.exports = {
  signupService,
  loginService,
  postUploadService,
  getAllPostsService,
  getPostsCategoryService,
  photoUploadAws,
};
