const express = require("express");
const app = express();

app.use(logger);

app.get("/", (req, res) => {
  console.log("Home page");
  res.send("Home page");
});

app.get("/users", auth, (req, res) => {
  console.log(`User is admin = ${req.admin}`);
  res.send("Users page");
});

function logger(req, res, next) {
  console.log("Before");
  next();
  console.log("After");
}

function auth(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    next();
    return;
  }
  res.send("No auth");
}

app.listen(3000);
