const user = localStorage.getItem("username");
const username = document.querySelector("#username");
const sendBtn = document.querySelector("#send-message");
const input = document.querySelector("#message-input");

username.innerHTML = `Welcome ${user}!`;

const socket = io();

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let message = document.querySelector("#message-input").value;
    sendMessage(message, user);
  }
});

sendBtn.addEventListener("click", () => {
  let message = document.querySelector("#message-input").value;
  sendMessage(message, user);
});

function sendMessage(message, user) {
  socket.emit("addNewMessage", message, user);
}

socket.on("printMessage", (message, username) => {
  const li = document.createElement("li");
  const pUser = document.createElement("p");
  const pMsg = document.createElement("p");
  const pTime = document.createElement("p");

  pTime.textContent = new Date().toLocaleTimeString();
  pTime.className = "time";
  pMsg.textContent = message;
  pMsg.className = "msg";

  if (username === user) {
    li.className = "left";
  } else {
    pUser.textContent = username + ":";
    li.className = "right";
  }

  li.appendChild(pUser);
  li.appendChild(pMsg);
  li.appendChild(pTime);

  const ul = document.querySelector("#messages");
  ul.appendChild(li);
  document.querySelector("#message-input").value = "";
  updateScroll();
});

const updateScroll = () => {
  console.log("actualizamos scroll");
  let bar = document.querySelector("ul li:last-child");
  bar.scrollIntoView();
};
