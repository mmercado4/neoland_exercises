const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("nuevo usuario conectados");

  socket.on("addNewMessage", (message, user) => {
    io.emit("printMessage", message, user);
  });

  socket.on("disconnect", () => {
    console.log("usuario desconectado");
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
