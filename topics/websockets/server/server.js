const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  },
});

let playerScores = [];

io.on("connection", (socket) => {
  let scoreInterval;

  socket.on("scores", (scores) => {
    playerScores.push({ ...scores, id: socket.id });
    socket.emit("playerScores", playerScores);
    clearInterval(scoreInterval);

    scoreInterval = setInterval(() => {
      socket.emit("playerScores", playerScores);
    }, 5000);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
