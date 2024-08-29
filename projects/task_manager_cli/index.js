#!/usr/bin/env node

import addTask from "./commands/addTask.js";
import readTask from "./commands/readTask.js";
import updateTask from "./commands/updateTask.js";
import deleteTask from "./commands/deleteTask.js";

import { Command } from "commander";

const program = new Command();

// Setting the name and description of the CLI tool
program.name("todo").description("Your terminal task manager").version("1.0.0");

// Defining 'add' command
program.command("add").description("Create a new todo.").action(addTask);

// Defining 'read' command
program.command("read").description("Reads all the todos.").action(readTask);

// Defining 'update' command
program.command("update").description("Updates a todo.").action(updateTask);

// Defining 'delete' command
program.command("delete").description("Deletes a todo").action(deleteTask);

// Parsing CLI arguments and executing the corresponding actions
program.parse();
