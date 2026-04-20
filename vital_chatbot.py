#!/usr/bin/env python3
"""
Les Laboratoires VITAL - Gemini AI Chatbot
Powered by Google Gemini API (Free Model)
"""

import json
import os
from pathlib import Path
import google.generativeai as genai

# Configure Gemini API
API_KEY = "AIzaSyA5EfP7S4KFcewkyRzkRGdke70XKlTf6ho"
genai.configure(api_key=API_KEY)

def load_knowledge_base():
    """Load the Vital knowledge base from JSON file."""
    kb_path = Path(__file__).parent / "chatbot_knowledge_base.json"
    try:
        with open(kb_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: Knowledge base file not found at {kb_path}")
        return {}

def create_system_prompt(knowledge_base):
    """Create a comprehensive system prompt using the knowledge base."""
    kb_text = json.dumps(knowledge_base, ensure_ascii=False, indent=2)
    
    system_prompt = f"""You are an expert chatbot representing Les Laboratoires VITAL, a leading pharmaceutical laboratory in Tunisia specializing in natural phytotherapy and dietary supplements.

VITAL COMPANY KNOWLEDGE BASE:
{kb_text}

Your role is to:
1. Answer questions about Vital's company, products, and services
2. Provide accurate information about product ranges and their benefits
3. Help customers find solutions for their health needs
4. Provide contact information and company details
5. Explain the quality certifications and safety standards
6. Recommend appropriate products based on customer needs

Guidelines:
- Always be professional and helpful
- Base all answers on the provided knowledge base
- If asked about something not in the knowledge base, clearly state that
- Provide specific product names and their benefits
- Include contact information when relevant
- Emphasize the natural, safe, and certified nature of products
- Be friendly and patient with customer inquiries
- Use both French and English as needed

Start conversations warmly and ask how you can help them find the perfect natural solution from Vital."""
    
    return system_prompt

def initialize_chatbot():
    """Initialize the Gemini chatbot with the knowledge base."""
    knowledge_base = load_knowledge_base()
    system_prompt = create_system_prompt(knowledge_base)
    
    # Use the free Gemini model (gemini-2.0-flash is available for free tier)
    model = genai.GenerativeModel(
        model_name='gemini-2.0-flash',
        system_instruction=system_prompt
    )
    
    return model

def chat_with_vital(model, conversation_history=None):
    """Run an interactive chat session with the Vital chatbot."""
    if conversation_history is None:
        conversation_history = []
    
    print("\n" + "="*70)
    print("🌿 LES LABORATOIRES VITAL - AI CHATBOT 🌿")
    print("="*70)
    print("Welcome! I'm the Vital Health Assistant.")
    print("Ask me anything about our natural products and services.")
    print("Type 'quit' or 'exit' to end the conversation.")
    print("="*70 + "\n")
    
    try:
        chat_session = model.start_chat(history=conversation_history)
        
        while True:
            # Get user input
            user_input = input("\n👤 You: ").strip()
            
            if not user_input:
                print("Please enter a question or message.")
                continue
            
            if user_input.lower() in ['quit', 'exit', 'bye', 'goodbye']:
                print("\n🌿 Vital Chatbot: Thank you for visiting Les Laboratoires VITAL!")
                print("For more information, visit us at: https://vital.com.tn")
                print("Contact: contact@vital.com.tn | Phone: +216 71 385 339")
                break
            
            try:
                # Send message to Gemini
                response = chat_session.send_message(user_input)
                assistant_message = response.text
                
                # Display response
                print(f"\n🤖 Vital Chatbot: {assistant_message}")
                
                # Update conversation history
                conversation_history.append({
                    "role": "user",
                    "parts": [user_input]
                })
                conversation_history.append({
                    "role": "model",
                    "parts": [assistant_message]
                })
                
            except Exception as e:
                print(f"\n❌ Error communicating with Gemini: {str(e)}")
                print("Please try again or check your API key.")
    
    except KeyboardInterrupt:
        print("\n\n👋 Chat interrupted. Thank you for using Vital Chatbot!")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        raise

def test_api_connection():
    """Test if the API connection is working."""
    try:
        print("\n🔌 Testing Gemini API connection...")
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content("Say 'Vital chatbot is working!' in one sentence.")
        print(f"✅ API Connection successful!")
        print(f"Response: {response.text}\n")
        return True
    except Exception as e:
        print(f"❌ API Connection failed: {str(e)}")
        print("Please check your API key and internet connection.")
        return False

def main():
    """Main entry point for the chatbot."""
    print("\n🌿 Initializing Les Laboratoires VITAL Chatbot...")
    
    # Test API connection first
    if not test_api_connection():
        return
    
    # Initialize the chatbot
    print("📚 Loading Vital knowledge base...")
    model = initialize_chatbot()
    print("✅ Chatbot ready!\n")
    
    # Start chat
    chat_with_vital(model)

if __name__ == "__main__":
    main()
