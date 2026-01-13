import os
import time
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv(dotenv_path=".env", override=True)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

PRIMARY_MODEL = "models/gemini-2.5-flash"
FALLBACK_MODEL = "models/gemini-flash-lite-latest"

def ask_gemini(prompt: str) -> str:
    for attempt in range(2):  # retry once
        try:
            response = client.models.generate_content(
                model=PRIMARY_MODEL if attempt == 0 else FALLBACK_MODEL,
                contents=prompt
            )

            if response and response.text:
                return response.text.strip()

        except Exception as e:
            print(f"⚠️ Gemini attempt {attempt+1} failed:", e)
            time.sleep(1)

    # FINAL fallback
    return "🤖 I'm here to help! You can ask me to show products, add items to cart, or checkout."