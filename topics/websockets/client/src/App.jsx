import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Input from "./components/input/input.component";

import "./App.css";

function App() {
  const socket = io("http://localhost:3000");
  const [score, setScore] = useState({});
  const [scores, setAllScores] = useState([]);

  function connectSocket() {
    socket.on("connect", () => {
      console.log("Socket connected");
    });
  }

  const handleInput = (event) => {
    let { name, value } = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({ ...prev, ...currentObj }));
  };

  const sendScores = () => {
    socket.emit("scores", score);

    socket.on("playerScores", (playerScores) => {
      setAllScores(playerScores);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>

      <Input
        name="name"
        placeholder="Enter your name"
        handleInput={handleInput}
      />
      <Input
        name="score"
        placeholder="Enter your score"
        handleInput={handleInput}
      />

      <button className="send-scores" onClick={sendScores}>
        Send Score
      </button>

      {scores.length > 0 ? (
        <table>
          <caption>Player Scores</caption>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>

            {scores.map((score) => (
              <tr key={score.id}>
                <td>{score?.name}</td>
                <td>{score?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
