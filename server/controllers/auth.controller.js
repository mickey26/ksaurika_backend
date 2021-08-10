const { signupService, loginService } = require("../services/auth.services");

async function signup(req, res, next) {
  const { email, username, password } = req.body;
  console.log(req.body, "test2");
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
          console.log(error, result, "evert");
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
  console.log(req, "test");
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

module.exports = {
  signup,
  login,
};
