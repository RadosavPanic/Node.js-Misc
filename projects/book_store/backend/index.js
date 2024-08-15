import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRouter from "./routes/booksRoute.js";
import cors from "cors";

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
/* app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
); */
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Homepage");
});

async function init() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    app.listen(process.env.PORT || 3005);
  } catch (err) {
    console.log(err.message);
  }
}

init();
