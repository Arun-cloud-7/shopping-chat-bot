import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def ask_gemini(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)

        if not response or not response.text:
            return "⚠️ Sorry, I couldn’t generate a response right now."

        return response.text

    except Exception as e:
        return f"❌ Gemini error: {str(e)}"
