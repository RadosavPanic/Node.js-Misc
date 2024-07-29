const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customers");

const app = express();

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/api/customers", async (req, res) => {
  try {
    const customersList = await Customer.find();
    res.send({ customers: customersList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/customers", (req, res) => {
  const customer = new Customer(req.body);
  customer.save();
  res.status(201).json({ customer });
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);

    app.listen(PORT, () => {
      console.log(`Server is started on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
