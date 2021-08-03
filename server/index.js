const express = require("express");
const PORT = 8080;
const app = express();

app.get("/apisa", (req, res) => {
  res.json({ msg: "hello there" });
});

app.listen(PORT, () => {
  console.log(`App is fucking running on ${PORT}`);
});
