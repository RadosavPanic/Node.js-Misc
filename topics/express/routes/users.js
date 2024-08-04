const express = require("express");

const userRouter = express.Router();

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

userRouter.use(logger);

const users = [
  { firstName: "John", industry: "IT" },
  { firstName: "Peter", industry: "Banking" },
  { firstName: "Michael", industry: "Consulting" },
];

userRouter
  .route("/")
  .get((req, res) => res.json({ users }))
  .post((req, res) => {
    users.push(req.body);
    res.redirect(`/users/${users.length - 1}`);
  });

userRouter.get("/new", (req, res) => {
  res.render("users/new");
});

userRouter
  .route("/:id")
  .get((req, res) => res.send(`Get User with ID ${req.params.id}`))
  .put((req, res) => res.send(`Update User with ID ${req.params.id}`))
  .delete((req, res) => res.send(`Delete user with ID ${req.params.id}`));

userRouter.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = userRouter;
