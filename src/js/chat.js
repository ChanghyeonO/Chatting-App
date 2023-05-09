//여기가 프론트
"use strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", event => {
  if (!chatInput.value) {
    return;
  }
  if (event.keyCode === 13) {
    send();
    chatInput.value = "";
  }
});

function send() {
  if (!chatInput.value) {
    return;
  }
  if (!nickname.value) {
    alert("닉네임을 입력하세요!");
    return;
  }
  const params = {
    name: nickname.value,
    message: chatInput.value,
  };
  socket.emit("chatting", params);
}

sendButton.addEventListener("click", () => {
  send();
  chatInput.value = "";
});

socket.on("chatting", data => {
  const { name, message, time } = data;
  const item = new LiModel(name, message, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, message, time) {
  this.name = name;
  this.message = message;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "received");
    const dom = ` 
    <span class="profile">
      <span class="user">${this.name}</span>
      <img class="profile-image" src="https://placeimg.com/50/50/50/any" alt="any">
    </span>
    <span class="message">${this.message}</span>
    <span class="time">${this.time}</span>
    `;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}
