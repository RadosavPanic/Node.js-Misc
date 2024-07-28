const process = require("node:process");
const EventEmitter = require("events");

const raceDriver = new EventEmitter();

// Subscribe to emitter for Observer 1
raceDriver.on("race", (result) => {
  if (result === "start") console.log("Race started. Place your bets!");
});

// Subscribe to emitter for Observer 2
raceDriver.on("race", (result) => {
  if (result === "win") console.log("Congratulations! You are the best!");
});

// Subscribe to emitter for Observer 3
raceDriver.on("race", (result) => {
  if (result === "win") console.log("I could have done better than that!");
});

// Subscribe to process for Observer 1
process.on("exit", (code) => {
  console.log(`Process exit event with code: ${code}`);
});

raceDriver.emit("race", "start");
raceDriver.emit("race", "win");
raceDriver.emit("race", "lost");
