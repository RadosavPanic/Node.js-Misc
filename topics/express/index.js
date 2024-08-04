const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");

const app = express();

// Server settings
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRouter);

app.listen(3000);
