const access = document.querySelector("#access");
const alias = document.querySelector("#alias");

access.addEventListener("click", () => {
  if (alias.value) {
    accessToChat(alias.value);
  } else {
    alert("Indica tu alias para entrar");
  }
});

const accessToChat = (nickname) => {
  console.log("to nickname es " + nickname);
  localStorage.setItem("username", nickname);
  window.location.href = "/chat";
};
