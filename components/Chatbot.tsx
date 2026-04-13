'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `Tu es l'assistant virtuel officiel des Laboratoires Vital (Tunisie). Tu es spécialiste des compléments alimentaires naturels à base de plantes. Réponds toujours en français, de manière professionnelle, rassurante et utile. Base tes réponses uniquement sur les informations du site Vital. Rappelle toujours : 'Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien.'

Informations sur l'entreprise:
- Fondé en 2000 en Tunisie. Leader africain des compléments alimentaires naturels à base de plantes (phytothérapie, bien-être, cosmétologie).
- 500 produits commercialisés en Tunisie et à l'étranger.
- 300 millions d'unités fabriquées par an.
- 400 employés (24% cadres).
- 1 ordonnance sur 3 contient un produit Vital (Tunisie).
- Certifications: ISO 9001, ISO 22000, ISO 22716, Halal.

Gammes et Produits:
- Gamme Minceur → Mincicare 4 actions, Minciligne (Coupe faim, Brûle Graisse, Draineur, Vitaminé)
- Gamme Enfant → Apitou n°1, Pédiakids (Apigrip, Apinez, Vitamine D3, etc.)
- Gamme Carences → Tetra B
- Autres gammes: Articulation, Beauté et peau, Capital osseux, Circulation, Energie, Femme, Homme, Immunité, Mémoire et concentration, Métabolisme, Moral, Ongles et cheveux, Solaire, Transit Gastro intestinal, Voies urinaires.
- Exemples de produits: Ashwagandha, Magvit, Ferbiotic, Phytothéra, etc.

Historique:
- 2000: Création
- 2003: Premier site de production + Gelée Royale
- 2004: Premier producteur local en phytothérapie
- 2010-2020: Toutes les certifications ISO + Halal
- Aujourd'hui: Export vers plusieurs pays (Algérie, Maroc, France, etc.)`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Clé API manquante");
      }
      const ai = new GoogleGenAI({ apiKey });

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [...history, { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: 'HIGH' as any },
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Désolé, je n\'ai pas pu formuler une réponse.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Désolé, une erreur est survenue (ou la clé API est manquante). Veuillez réessayer plus tard.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
      >
        <MessageCircle size={24} />
        <span className="font-medium hidden md:inline">VitAI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col h-[500px] max-h-[80vh]">
          <div className="bg-gray-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">VitAI • Laboratoires Vital</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white transition-colors">
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
