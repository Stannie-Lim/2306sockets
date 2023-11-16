import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// importing socket.io client
import io from "socket.io-client";

// creating our socket.io client to connect to the server
const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  // socket.on adds an event listener for the "new_message" event
  // this is being called many many times because
  // it's within the component body. whenever you setState, it will re-render, and re-call this socket.on function

  useEffect(() => {
    socket.on("all_messages", (data) => {
      setAllMessages(data);
    });
  }, []);

  const sendMessage = () => {
    // emit a message to your server
    socket.emit("chat", message);
  };

  const receivedMessages = allMessages.filter(
    (message) => message.user !== socket.id
  );

  const sentMessages = allMessages.filter(
    (message) => message.user === socket.id
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ul>
          {receivedMessages.map((msg) => (
            <li>{msg.message}</li>
          ))}
        </ul>
        <ul>
          {sentMessages.map((msg) => (
            <li>{msg.message}</li>
          ))}
        </ul>
      </div>

      <input value={message} onChange={(ev) => setMessage(ev.target.value)} />
      <button onClick={sendMessage}>Send message</button>
    </>
  );
}

export default App;
