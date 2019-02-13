/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./keys");
const message = require("./message");
const logger = require("heroku-logger");

const PORT = process.env.PORT || 3001;

const app = new express();

const server = app.listen(PORT, function() {
  console.log("Server running on port ", PORT);
  logger.info("Server running on port ", PORT);
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

// Connecting socket.io

const io = require("socket.io")(server);
io.on("connection", function(socket) {
  console.log("Socket connection established on ", socket.id);
  logger.info("Connection to Socket established on", socket.id);
  socket.on("SEND_MESSAGE", async function(data) {
    data.timestamp = new Date();
    await new message(data).save();
    io.emit("MESSAGE", data);
  });
});

//API endpoints

app.get("/messages", async (req, res) => {
  let result = await message.find();
  res.send(result);
});

// Connecting MongoDB

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection.on("error", () => {
  logger.info("Error in database connection");
  console.log("Error in database connection");
});
mongoose.connection.once("open", function() {
  console.log("Connection to MongoDB established");
  logger.info("Connection to MongoDB established");
});
