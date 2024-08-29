import inquirer from "inquirer";
import Todos from "../schema/TodoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import ora from "ora";
import chalk from "chalk";

export const getTaskCode = async () => {
  try {
    const answers = await inquirer.prompt([
      { name: "code", message: "Enter the code of the todo: ", type: "input" },
    ]);

    answers.code = answers.code.trim();

    return answers;
  } catch (err) {
    console.log(`Something went wrong...\n${err}`);
  }
};

const deleteTask = async () => {
  try {
    const userCode = await getTaskCode();

    await connectDB();
    const spinner = ora("Finding and Deleting the todo...").start();

    const response = await Todos.deleteOne({ code: userCode.code });
    spinner.stop();

    if (response.deletedCount === 0) {
      console.log(
        chalk.redBright(
          "Could not find any todo matching the provided name. Deletion failed."
        )
      );
    } else {
      console.log(chalk.greenBright("Deleted Task successfully"));
    }

    await disconnectDB();
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
    process.exit(1);
  }
};

export default deleteTask;
