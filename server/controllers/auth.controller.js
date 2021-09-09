const {
  signupService,
  loginService,
  postUploadService,
  getAllPostsService,
  getPostsCategoryService,
  photoUploadAws,
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
        (eror, result, token, user_id, user_name) => {
          if (result) {
            return res.status(200).json({
              message: "Success",
              data: { email, token, user_id, user_name },
            });
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

async function uploadPhoto(req, res) {
  const file = req.file;
  await photoUploadAws(file, (error, data) => {
    if (error) {
      return res.status(400).json({ message: "Something Went wrong" });
    } else {
      let dataUrl = data;
      return res
        .status(200)
        .json({ message: "photo added successfully", data: data });
    }
  });
}
async function postCreate(req, res) {
  console.log(req, "create post");
  const {
    userId,
    postTitle,
    postSubHeading,
    postImgUrl,
    postAuthor,
    postCategory,
    postContent,
  } = req.body;
  let post = req.body;
  if (
    !userId ||
    !postTitle ||
    !postSubHeading ||
    !postImgUrl ||
    !postAuthor ||
    !postCategory ||
    !postContent
  ) {
    return res
      .status(402)
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
  await getAllPostsService((error, response) => {
    if (error) {
      res.status(401).json({ message: "Something Went Wrong" });
    } else {
      res.status(200).json({ message: "Success", data: response });
    }
  });
}
async function getPostsCategory(req, res) {
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
async function getPostsByCategory(req, res) {
  console.log(req.body, "kkb");
  res.status(200).json({ message: "Success" });
}

module.exports = {
  signup,
  login,
  uploadPhoto,
  getAllPosts,
  getPostsCategory,
  postCreate,
  getPostsByCategory,
};
