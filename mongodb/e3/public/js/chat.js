const user = localStorage.getItem("username");
const username = document.querySelector("#username");
const sendBtn = document.querySelector("#send-message");

username.innerHTML = `Welcome ${user}!`;

const socket = io();

sendBtn.addEventListener("click", () => {
  let message = document.querySelector("#message-input").value;
  sendMessage(message, user);
});

function sendMessage(message, user) {
  socket.emit("addNewMessage", message, user);
}

socket.on("printMessage", (message, username) => {
  console.log(username === user);

  const li = document.createElement("li");
  li.textContent = username + ": " + message;
  if (username === user) {
    li.className = "left";
  } else {
    li.className = "right";
  }
  const ul = document.querySelector("#messages");
  ul.appendChild(li);
  document.querySelector("#message-input").value = "";
}); //PENDIENTE MONTAR COMO WHATAPPS.S
