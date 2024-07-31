const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customers");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", false);
app.use(cors());
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

app.get("/api/customers/:id", async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ customer });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      {
        new: true,
      }
    );
    res.json({ customer });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/api/customers/:id", async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      req.body,
      { new: true }
    );
    res.json({ customer });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/api/orders/:id", async (req, res) => {
  try {
    const { id: orderId } = req.params;
    req.body._id = orderId;
    const result = await Customer.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$": req.body } },
      { new: true }
    );
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/customers", async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
