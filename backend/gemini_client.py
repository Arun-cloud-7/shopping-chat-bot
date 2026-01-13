import os
import google.generativeai as genai

# Configure API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# ✅ THIS MODEL WORKS with google-generativeai v0.8.x
model = genai.GenerativeModel("gemini-pro")

def ask_gemini(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ Gemini error: {e}"
