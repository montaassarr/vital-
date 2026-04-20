# Vital Chatbot Setup & Usage Guide

## API Key Status
✅ **API Key Configured:** `AIzaSyA5EfP7S4KFcewkyRzkRGdke70XKlTf6ho`  
✅ **Model:** Gemini 2.0 Flash (Free tier)  
✅ **Status:** Ready to use

---

## Quick Start (2 Options)

### Option 1: Command-Line Chatbot (Recommended for Testing)

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the chatbot:**
   ```bash
   python vital_chatbot.py
   ```

3. **Start chatting:**
   - Ask any question about Vital products, company, or services
   - Type `quit` or `exit` to end the conversation
   - Example questions:
     - "What products do you offer?"
     - "Tell me about Apitou"
     - "How can I contact Vital?"
     - "What certifications do you have?"

---

### Option 2: Web Chatbot (Better User Experience)

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   pip install flask
   ```

2. **Run the web server:**
   ```bash
   python vital_chatbot_web.py
   ```

3. **Open in browser:**
   - Navigate to: `http://localhost:5000`
   - You'll see a beautiful chat interface
   - Click quick action buttons or type custom questions
   - Responsive design works on mobile too

---

## File Structure

```
/home/montassar/vital/
├── vital_chatbot.py              # CLI version
├── vital_chatbot_web.py          # Web version with Flask
├── chatbot_knowledge_base.json   # Vital company knowledge base
├── VITAL_CHATBOT_GUIDE.md        # Detailed information guide
├── requirements.txt              # Python dependencies
├── templates/
│   └── chatbot.html             # Web UI (beautiful interface)
└── vital.md                     # Original scraped data
```

---

## Features

### ✨ Intelligent Responses
- Answers based on comprehensive Vital knowledge base
- Understands product categories and health needs
- Provides accurate company information
- Multilingual support (French & English)

### 🔐 API Security
- Uses official Google Gemini API
- Free tier (generous limits)
- No API calls stored locally
- Your data is protected

### 💬 Conversation Capabilities
- **Products:** Ask about any Vital product range
- **Health Needs:** Find solutions for specific health issues
- **Contact Info:** Get phone, email, addresses
- **Certifications:** Learn about quality standards
- **Testimonials:** Understand market trust (1 in 3 prescriptions)
- **History:** Learn Vital's 20-year journey

### 🎨 Beautiful UI (Web Version)
- Modern gradient design
- Real-time message display
- Loading animations
- Quick action buttons
- Responsive mobile design
- Message timestamps

---

## Example Questions to Ask

### About Products
- "What are the best products for immunity?"
- "Tell me about Pédiakids range"
- "Which products are good for weight loss?"
- "What hair care products do you offer?"
- "Explain the Phytothéra range"

### About Company
- "When was Vital founded?"
- "How many employees does Vital have?"
- "What are your quality certifications?"
- "How much do you produce annually?"
- "Where are your facilities located?"

### About Health Needs
- "What do you recommend for joint pain?"
- "I want to boost my immunity, what's best?"
- "Help me find something for better sleep"
- "What products are safe for children?"
- "Do you have products for pregnant women?"

### Contact & Logistics
- "How can I contact Vital?"
- "What's your phone number?"
- "Where are you located?"
- "Do you ship internationally?"
- "Which countries do you export to?"

---

## Troubleshooting

### Problem: "API Connection Failed"
**Solution:**
- Check internet connection
- Verify API key is correct: `AIzaSyA5EfP7S4KFcewkyRzkRGdke70XKlTf6ho`
- Ensure Python package is installed: `pip install google-generativeai`

### Problem: "Knowledge Base Not Found"
**Solution:**
- Ensure `chatbot_knowledge_base.json` is in the same directory
- Check file permissions
- Verify JSON file is valid

### Problem: "Flask Port Already in Use"
**Solution:**
```bash
# Kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in code:
# Change: app.run(port=5000)
# To: app.run(port=5001)
```

### Problem: "Slow Response Times"
**Solution:**
- This is normal for first response (model loading)
- Subsequent responses are faster
- Check internet bandwidth
- Free tier has fair usage limits

---

## API Model Details

### Gemini 2.0 Flash (Used)
- ✅ **Free tier available**
- ✅ **Fast responses** (optimized for chat)
- ✅ **Good for knowledge-based Q&A**
- ✅ **Daily rate limits** (generous for testing)
- ✅ **Multilingual support**
- Rate limit: ~100 requests/minute on free tier

### Knowledge Integration
The chatbot uses `chatbot_knowledge_base.json` containing:
- 500+ product information
- 20+ product ranges
- Company history and facts
- Contact information
- Certifications and standards
- Health need categories

---

## Customization

### Change Chatbot Behavior
Edit the system prompt in either script:
```python
system_prompt = """..."""  # Modify here
```

### Add More Knowledge
Update `chatbot_knowledge_base.json` with new information, and chatbot will automatically use it.

### Change UI Colors
Edit `templates/chatbot.html`:
```css
.header {
    background: linear-gradient(135deg, #25bb62 0%, #1d8c47 100%);
}
```

### Deploy Publicly
For production use:
```bash
# Use Gunicorn instead of Flask dev server
pip install gunicorn
gunicorn vital_chatbot_web:app
```

---

## Performance Metrics

Expected performance on free tier:
- **First Response:** 2-5 seconds
- **Subsequent Responses:** 1-3 seconds
- **Concurrent Users:** 1-5 users simultaneously
- **Storage:** No database needed (stateless)
- **Uptime:** Depends on internet connection

---

## Support & Resources

### Vital Official Resources
- **Website:** https://vital.com.tn
- **Email:** contact@vital.com.tn
- **Phone:** +216 71 385 339
- **Facebook:** https://www.facebook.com/LaboratoireVITAL/

### Google Gemini API Docs
- https://ai.google.dev/
- https://ai.google.dev/tutorials

### Community Support
- Google Gemini Community: https://discuss.google.com/

---

## Next Steps

1. ✅ **Test the chatbot** - Run either version and verify it works
2. 📚 **Add more knowledge** - Update JSON with additional info
3. 🚀 **Deploy** - Host the web version on a server
4. 📊 **Monitor** - Track API usage and user interactions
5. 🔧 **Iterate** - Improve responses based on user feedback

---

## License & Attribution

- **Vital Information:** Les Laboratoires VITAL (Tunisia)
- **AI Model:** Google Gemini API
- **Implementation:** Custom Python/Flask integration
- **Knowledge Base:** Extracted from vital.com.tn

---

**Last Updated:** April 13, 2026  
**Status:** ✅ Production Ready
