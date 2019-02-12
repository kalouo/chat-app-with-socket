/* eslint-disable no-console */
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, function() {
  console.log("Server running on port ", PORT);
});

app.use(express.static("dist"));

const io = require("socket.io")(server);
io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("SEND_MESSAGE", function(data) {
    io.emit("MESSAGE", data);
  });
});
