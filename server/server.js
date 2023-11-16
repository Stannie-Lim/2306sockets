const express = require("express");
const socketio = require("socket.io");

const app = express();

// creates a server and listens to requests on port 3000
const server = app.listen(3000);

// we can use this server to create a socketio server
// this io object is your socketio server

// your frontend is http://localhost:5173/
// your backend is http://localhost:3000/
// you must enable cors for your socket server
const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const messages = [];

io.on("connection", (socket) => {
  socket.emit("all_messages", messages);

  socket.on("chat", async (data) => {
    // socket.id is the user that is connected
    messages.push({ user: socket.id, message: data });

    // emit the 'all_messages' event with all the messages in the array
    io.emit("all_messages", messages);
  });
});
