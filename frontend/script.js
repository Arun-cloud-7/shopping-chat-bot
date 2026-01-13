const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typing = document.getElementById("typing");

// 🔴 CHANGE THIS
const BACKEND_URL = "https://shopping-chat-bot.onrender.com/chat";

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div class="user-msg">${message}</div>`;
  input.value = "";
  typing.classList.remove("hidden");
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("BACKEND RESPONSE:", data);
    typing.classList.add("hidden");


    // ✅ HANDLE PRODUCT LIST
    if (data.type === "products" && Array.isArray(data.items)) {
      data.items.forEach(p => {
        chatBox.innerHTML += `
          <div class="bot-msg">
            🛍️ <b>${p.name}</b><br>
            💰 ₹${p.price}<br>
            📦 Stock: ${p.stock}
          </div>
        `;
      });
    }
    // ✅ HANDLE NORMAL TEXT
    else {
      chatBox.innerHTML += `<div class="bot-msg">🤖 ${JSON.stringify(data)}</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    typing.classList.add("hidden");
    chatBox.innerHTML += `<div class="bot-msg">⚠️ Server not responding</div>`;
  }
}

