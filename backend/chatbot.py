import json
from gemini_client import ask_gemini

with open("products.json", "r") as f:
    products = json.load(f)

cart = []

# ---------- HELPERS ----------

def list_products():
    return {
        "type": "products",
        "items": products
    }

def add_to_cart(message):
    for p in products:
        if p["name"].lower() in message:
            if p["stock"] > 0:
                p["stock"] -= 1
                cart.append(p)
                return f"✅ {p['name']} added to cart."
            else:
                return f"❌ {p['name']} is out of stock."
    return "❌ Product not found."

def checkout():
    if not cart:
        return "🛒 Your cart is empty."

    total = sum(p["price"] for p in cart)
    cart.clear()
    return f"🎉 Order confirmed!\nTotal: ₹{total}"

# ---------- MAIN ROUTER ----------

# def process_message(message: str):
#     msg = message.lower().strip()

#     # ✅ PRODUCT LIST (ALL VARIANTS)
#     if any(k in msg for k in ["product", "products", "show", "list"]):
#         return list_products()

#     # ✅ ADD TO CART
#     if any(k in msg for k in ["add", "cart", "buy"]):
#         return add_to_cart(msg)

#     # ✅ CHECKOUT
#     if any(k in msg for k in ["checkout", "order", "place order"]):
#         return checkout()

#     # ✅ ONLY NOW call Gemini (optional)
#     ai_reply = ask_gemini(
#         f"You are a shopping assistant. Reply briefly to: {message}"
#     )

#     return ai_reply if ai_reply else (
#         "🤖 Try asking:\n"
#         "• Show products\n"
#         "• Add backpack\n"
#         "• Checkout"
#     )

# 2nd main code
def process_message(message: str):
    msg = message.lower().strip()

    if any(k in msg for k in ["product", "products", "show", "list"]):
        return list_products()

    if any(k in msg for k in ["add", "cart", "buy"]):
        return add_to_cart(msg)

    if any(k in msg for k in ["checkout", "order", "place order"]):
        return checkout()

    ai_reply = ask_gemini(
        f"You are a shopping assistant. Reply briefly to: {message}"
    )

    return ai_reply or (
        "🤖 Try asking:\n"
        "• Show products\n"
        "• Add backpack\n"
        "• Checkout"
    )

