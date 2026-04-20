'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import Markdown from 'react-markdown';
import VitaiAssistLogo from './VitaiAssistLogo';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(true);
  const [notificationCount, setNotificationCount] = useState(1);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: 'Bonjour ! Je suis VitAI, votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setShowNudge(false);
      setNotificationCount(0);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowNudge(false);
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          userMessage: userMsg,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data.message || 'Désolé, je n\'ai pas pu formuler une réponse.';
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      const message = error instanceof Error ? error.message : 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.';
      setMessages(prev => [...prev, { role: 'model', text: message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowNudge(false);
            setNotificationCount(0);
          }}
          className={`fixed bottom-6 right-6 px-3 py-2 bg-white/95 text-gray-800 rounded-full border border-emerald-400 shadow-lg hover:shadow-xl transition-all z-[9999] flex items-center gap-2 ${showNudge ? 'chatbot-shake chatbot-glow' : ''}`}
          aria-label="Open VitAI Assist"
        >
          <VitaiAssistLogo className="hidden h-8 w-[132px] md:block" />
          <span className="md:hidden vitai-logo-mark" aria-hidden="true">
            <Bot size={16} />
          </span>
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-5 h-5 rounded-full bg-red-500 px-1 text-[11px] leading-5 text-center font-semibold text-white shadow-md chatbot-bounce">
              {notificationCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-emerald-400 overflow-hidden z-[9999] flex flex-col h-[500px] max-h-[80vh]">
          <div className="bg-emerald-500 border-b border-emerald-600 text-white p-4 flex justify-between items-center shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
            <div className="flex items-center gap-2">
              <VitaiAssistLogo className="h-10 w-[180px]" />
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                  {msg.role === 'model' ? (
                    <div className="markdown-body text-sm prose prose-sm prose-gray">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
