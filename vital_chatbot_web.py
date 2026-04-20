#!/usr/bin/env python3
"""
Vital Chatbot - Web Version with Flask
Uses Google Gemini API (Free Model)
"""

import json
from pathlib import Path
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

# Configure Gemini API
API_KEY = "AIzaSyA5EfP7S4KFcewkyRzkRGdke70XKlTf6ho"
genai.configure(api_key=API_KEY)

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Load knowledge base
def load_knowledge_base():
    kb_path = Path(__file__).parent / "chatbot_knowledge_base.json"
    with open(kb_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Initialize model with system prompt
def get_model():
    knowledge_base = load_knowledge_base()
    kb_text = json.dumps(knowledge_base, ensure_ascii=False, indent=2)
    
    system_prompt = f"""You are an expert chatbot representing Les Laboratoires VITAL, a leading pharmaceutical laboratory in Tunisia specializing in natural phytotherapy and dietary supplements.

COMPANY KNOWLEDGE:
{kb_text}

Your role is to:
1. Answer questions about Vital's company, products, and services
2. Provide accurate information about product ranges
3. Help customers find solutions for their health needs
4. Provide contact and company information
5. Explain quality certifications and safety standards

Guidelines:
- Always be professional and helpful
- Base answers on the provided knowledge
- Emphasize natural, safe, certified products
- Be friendly and patient
- Include relevant contact info
- Use both French and English"""
    
    return genai.GenerativeModel(
        model_name='gemini-2.0-flash',
        system_instruction=system_prompt
    )

# Store conversation history in memory (for demo purposes)
chat_sessions = {}

@app.route('/')
def index():
    return render_template('chatbot.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '').strip()
    session_id = data.get('session_id', 'default')
    
    if not user_message:
        return jsonify({'error': 'Empty message'}), 400
    
    try:
        # Initialize or get chat session
        if session_id not in chat_sessions:
            model = get_model()
            chat_sessions[session_id] = {
                'model': model,
                'chat': model.start_chat(history=[]),
                'history': []
            }
        
        session = chat_sessions[session_id]
        
        # Send message
        response = session['chat'].send_message(user_message)
        bot_response = response.text
        
        # Update history
        session['history'].append({
            'role': 'user',
            'content': user_message
        })
        session['history'].append({
            'role': 'bot',
            'content': bot_response
        })
        
        return jsonify({
            'success': True,
            'response': bot_response,
            'session_id': session_id
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content("Respond with 'OK'")
        return jsonify({
            'status': 'healthy',
            'api': 'working',
            'message': response.text
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("🌿 Starting Vital Chatbot Web Server...")
    print("🔗 Open browser and go to: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
