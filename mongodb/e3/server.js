const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const Messages = require("./models/message");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Metemos el bodyparser.

//No incluyo políticas CORS por ir todo junto.

io.on("connection", (socket) => {
  console.log("nuevo usuario conectados");

  socket.on("addNewMessage", (message, user) => {
    io.emit("printMessage", message, user);
  });

  socket.on("disconnect", () => {
    console.log("usuario desconectado");
  });
});

mongoose.connect(
  "mongodb://localhost/BBDD",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, response) => {
    if (error) {
      console.error(error, "DB connection failed!");
    } else {
      console.log("DB connected");
    }
  }
);

app.post("/save-message", (request, response) => {
  const newMessage = new Messages({
    user: request.body.user,
    message: request.body.message,
    date: new Date(),
  });

  newMessage.save((error) => {
    if (error) console.error(error);
    else {
      response.send({
        success: true,
        message: "message saved successfully",
      });
    }
  });
});

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/html", { extensions: ["html"] }));
app.use(
  "/js",
  express.static(__dirname + "/node_modules/socket.io/client-dist")
);

app.use(
  "/",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")
);

server.listen(1333, () => {
  console.log("Server is running at port 1333");
});
