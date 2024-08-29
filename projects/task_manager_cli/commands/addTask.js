import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

const input = async () => {
  const answers = await inquirer.prompt([
    { name: "name", message: "Enter the name of the task:", type: "input" },
    {
      name: "detail",
      message: "Enter the details of the task:",
      type: "input",
    },
  ]);

  return answers;
};

const askQuestions = async () => {
  const toDoList = [];
  let loop = false;

  do {
    const userResponse = await input();
    toDoList.push(userResponse);

    const confirmQ = await inquirer.prompt([
      {
        name: "confirm",
        message: "Do you want to add more tasks?",
        type: "confirm",
      },
    ]);

    if (confirmQ.confirm) {
      loop = true;
    } else {
      loop = false;
    }
  } while (loop);

  return toDoList;
};

const addTask = async () => {
  try {
    const userResponse = await askQuestions();
    await connectDB();
    const spinner = ora("Creating the todos...").start();

    userResponse.forEach(async (res) => {
      await Todos.create(res);
    });

    spinner.stop();
    console.log(chalk.greenBright("Todos successfully created!"));
    await disconnectDB();
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
    process.exit(1);
  }
};

export default addTask;
