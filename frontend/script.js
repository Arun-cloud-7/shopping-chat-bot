const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 🔴 CHANGE THIS TO YOUR RENDER BACKEND URL
const API_URL = "https://shopping-chat-bot.onrender.com/chat";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.reply) {
        addMessage(data.reply, "bot");
      } else {
        addMessage("⚠️ No reply from server", "bot");
      }
    })
    .catch((err) => {
      console.error(err);
      addMessage("❌ Backend not reachable", "bot");
    });
}