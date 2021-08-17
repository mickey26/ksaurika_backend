const {
  signupService,
  loginService,
  postUploadService,
  getAllPostsService,
  getPostsCategoryService,
} = require("../services/auth.services");

async function signup(req, res, next) {
  const { email, username, password } = req.body;
  try {
    if (!email) {
      return res.status(401).json({ message: "Email field required" });
    } else if (!username) {
      return res.status(401).json({ message: "user Name required" });
    } else if (!password) {
      return res.status(401).json({ message: "Password field required" });
    } else {
      let result = await signupService(
        email,
        username,
        password,
        (error, result) => {
          if (result) {
            return res
              .status(200)
              .json({ message: "User Added", data: { email, username } });
          } else {
            res.status(error.status).json({ message: error.message });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(401).json({ message: "Email required" });
    } else if (!password) {
      return res.status(401).json({ message: "Password required" });
    } else {
      let result = await loginService(
        email,
        password,
        (eror, result, token) => {
          if (result) {
            return res
              .status(200)
              .json({ message: "Success", data: { email, token } });
          } else {
            res.status(400).json({ message: "Incorrect Email or Password" });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

async function uploadPost(req, res) {
  const {
    user_id,
    post_title,
    post_subheading,
    post_imgurl,
    post_author,
    post_category,
    post_content,
  } = req.body;
  let post = req.body;
  if (
    !user_id ||
    !post_title ||
    !post_subheading ||
    !post_imgurl ||
    !post_author ||
    !post_category ||
    !post_content
  ) {
    return res
      .status(401)
      .json({ message: "Please fill the mandatory required" });
  } else {
    await postUploadService(post, (error, response) => {
      if (error) {
        res.status(401).json({ message: "Something went wrong" });
      } else {
        res.status(200).json({ message: "Post added successfully" });
      }
    });
  }
}

async function getAllPosts(req, res) {
  console.log(res, "req");
  await getAllPostsService((error, response) => {
    if (error) {
      res.status(401).json({ message: "Something Went Wrong" });
    } else {
      res.status(200).json({ message: "Success", data: response });
    }
  });
}
async function getPostsCategory(req, res) {
  console.log(res, "req");
  try {
    let result = await getPostsCategoryService((error, response) => {
      if (error) {
        res.status(401).json({ message: "Something Went Wrong" });
      } else {
        res.status(200).json({ message: "Success", data: response });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

module.exports = {
  signup,
  login,
  uploadPost,
  getAllPosts,
  getPostsCategory,
};
