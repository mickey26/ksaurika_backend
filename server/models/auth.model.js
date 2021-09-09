const bcrypt = require("bcrypt");
const salt = 10;
const { connection } = require("../db/dbConfig");

async function signupModel(email, username, password, callBack) {
  let checkQuery = `SELECT * FROM signup_user_tb WHERE EMAIL = "${email}" OR USER_NAME = "${username}";`;
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
          const que = `INSERT INTO signup_user_tb(email,user_name,password) VALUES ( "${email}", "${username}", "${hash}")`;
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
  let query = `SELECT email,password,user_id,user_name FROM signup_user_tb WHERE EMAIL = "${email}";`;
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

async function uploadPostModel(post, callback) {
  // handle Date functionlity

  const date = new Date();
  let day, month, year, currDate, query;
  day = date.getDate();
  month = date.getMonth();
  year = date.getFullYear();
  currDate = year + "-" + month + "-" + day;

  query = `INSERT INTO posts(user_id,post_title,post_subheading,post_author,post_category,post_content,created_at,post_imgurl) VALUES ("${post.userId}","${post.postTitle}","${post.postSubHeading}","${post.postAuthor}","${post.postCategory}","${post.postContent}",Now(),"${post.postImgUrl}")`;
  connection.query(query, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
}

async function getAllPostModel(callback) {
  const query = "SELECT * FROM posts";
  connection.query(query, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
}
async function getPostsCategoryModel(callback) {
  const query = "SELECT * FROM p_category";
  connection.query(query, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
}

module.exports = {
  signupModel,
  loginModel,
  uploadPostModel,
  getAllPostModel,
  getPostsCategoryModel,
};
