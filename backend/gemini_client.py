import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# ✅ Correct model name for google-generativeai SDK
model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)

        if not response or not response.text:
            return "⚠️ Gemini returned no response."

        return response.text

    except Exception as e:
        return f"❌ Gemini error: {str(e)}"
