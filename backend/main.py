from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot import process_message

app = FastAPI()

# ✅ ADD THIS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (safe for demo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "OK"}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    reply = process_message(req.message)

    # ✅ FIX
    if isinstance(reply, dict):
        return reply
    return {"reply": reply}

# @app.get("/")
# def health():
#     return {"status": "Shopping chatbot backend running"}
