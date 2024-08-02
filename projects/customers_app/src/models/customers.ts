import { Schema, model } from "mongoose";
import { ICustomer } from "./customer_types";

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
  industry: String,
  orders: [
    {
      description: String,
      amountInEuros: Number,
    },
  ],
});

const Customer = model("Customer", customerSchema);

export default Customer;
