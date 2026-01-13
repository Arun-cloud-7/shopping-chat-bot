import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ✅ Non-Flash model
model = genai.GenerativeModel(
    model_name="models/gemini-1.5-pro-latest"
)

def ask_gemini(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"⚠️ Gemini error: {str(e)}"
