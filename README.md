🛍️ AI Shopping Chatbot

An AI-powered shopping chatbot that allows users to browse products, add items to a cart, and place an order through a chat-based interface.

The application combines rule-based logic for reliable shopping flows with Google Gemini AI for conversational responses, ensuring both accuracy and natural interaction.

🚀 Live Demo

Frontend (Vercel):
👉 https://shopping-chat-bot.vercel.app

Backend (FastAPI on Render):
👉 https://your-backend-name.onrender.com/docs

🧠 Features

💬 Chat-based shopping experience

🛍️ Product listing with images

🛒 Add products to cart

✅ Checkout & order confirmation

🤖 Gemini AI integration for conversational replies

⚠️ Graceful fallback when AI quota is exceeded

🌐 Fully deployed and accessible online

🛠️ Tech Stack
Frontend

HTML

CSS (Modern dark UI)

Vanilla JavaScript

Deployed on Vercel

Backend

Python

FastAPI

Google Gemini API

Deployed on Render

Data

JSON-based product dataset (no database)

🏗️ Project Architecture
ai-shopping-chatbot/
│
├── frontend/        # Static UI (Vercel)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/         # FastAPI server (Render)
│   ├── main.py
│   ├── chatbot.py
│   ├── gemini_client.py
│   ├── products.json
│   └── requirements.txt
│
└── README.md

⚙️ How It Works

Rule-based logic handles:

Listing products

Adding to cart

Checkout and order confirmation

Gemini AI is used only for:

Natural conversation

Greetings and open-ended queries

This approach avoids AI hallucinations and keeps the core shopping flow reliable.

▶️ Run Locally
1️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Create a .env file inside backend/:

GEMINI_API_KEY=your_gemini_api_key_here


Backend runs at:

http://127.0.0.1:8000

2️⃣ Frontend Setup

Open frontend/index.html directly in your browser
(or use Live Server in VS Code).

Make sure script.js points to the backend URL:

fetch("http://127.0.0.1:8000/chat")

🌐 Deployment

Frontend: Deployed on Vercel as a static site

Backend: Deployed on Render as a FastAPI service

Environment variables: Managed securely via platform settings

📌 Example Chat Flow
User: Show products
Bot: (Displays product cards with images)

User: Add Backpack
Bot: Backpack added to cart.

User: Checkout
Bot: Order confirmed. Total: ₹2499

🧪 AI Rate Limit Handling

The app gracefully handles Gemini API rate limits:

Core shopping actions continue to work

AI responses fall back to predefined helpful messages

No crashes or broken UI

🎯 Evaluation Focus

This project demonstrates:

Practical AI integration

Clean frontend–backend separation

Defensive programming & error handling

Ability to deploy a complete working system
