const chat = document.getElementById("chat");
const input = document.getElementById("msg");

input.addEventListener("keypress", e => {
  if (e.key === "Enter") send();
});

async function send() {
  const text = input.value.trim();
  if (!text) return;

  // User bubble
  addMessage(text, "user");
  input.value = "";

  const res = await fetch("https://shopping-chat-bot.onrender.com/chat", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();

  // ✅ PRODUCT RESPONSE
  if (data.reply && typeof data.reply === "object" && data.reply.type === "products") {
    addMessage("🛍️ Here are the available products:", "bot");
    renderProducts(data.reply.items);
    return; // ⛔ STOP here
  }

  // ✅ NORMAL TEXT RESPONSE
  if (typeof data.reply === "string") {
    addMessage(data.reply, "bot");
    return;
  }

  // ❌ Safety fallback
  addMessage("⚠️ Something went wrong.", "bot");
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function renderProducts(products) {
  const grid = document.createElement("div");
  grid.className = "product-grid";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="quickAdd('${p.name}')">Add</button>
      </div>
    `;

    grid.appendChild(card);
  });

  chat.appendChild(grid);
  chat.scrollTop = chat.scrollHeight;
}

function quickAdd(name) {
  input.value = `Add ${name}`;
  send();
}
