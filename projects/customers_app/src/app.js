const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
console.log(typeof PORT);
const customers = [
  { name: "John", industry: "music" },
  { name: "Bob", industry: "networking" },
  { name: "Peter", industry: "sports" },
];

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});

app.post("/api/customers", (req, res) => {
  const newCustomer = req.body;
  customers.push(newCustomer);
  res.send({ customers: customers });
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);

    app.listen(PORT, () => {
      console.log(`Server is started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
