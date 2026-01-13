console.log("script.js loaded ✅");

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_URL = "https://shopping-chat-bot.onrender.com/chat"; // your backend

if (!chatBox || !input || !sendBtn) {
  console.error("❌ One or more elements not found");
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  console.log("Send button clicked 🚀");

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      addMessage(data.reply || "⚠️ No reply", "bot");
    })
    .catch((err) => {
      console.error(err);
      addMessage("❌ Backend error", "bot");
    });
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
