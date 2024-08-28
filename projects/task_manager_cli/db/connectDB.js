import mongoose from "mongoose";
import ora from "ora";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const spinner = ora("Connecting to the database...").start();
    await mongoose.connect(process.env.MONGO_URI);
    spinner.stop();
    console.log(chalk.greenBright("Successfully connected to database!!!"));
  } catch (err) {
    console.log(chalk.redBright("Error: "), err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log(chalk.greenBright("Disconnected from the database."));
  } catch (err) {
    console.log(chalk.redBright("Error: "), err);
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
