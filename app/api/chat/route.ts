import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

type ProviderName = 'groq' | 'gemini';

const KNOWLEDGE_BASE = {
  company: {
    name: 'Les Laboratoires VITAL',
    tagline: 'Créateurs de bien-être au naturel',
    founded: 2000,
    location: 'Tunisie',
    specialization: 'Phytothérapie, compléments alimentaires naturels, bien-être, cosmétologie',
  },
  headquarters: {
    address: 'Z.I Ben Arous – Route Mornag – Ben Arous, Tunisie',
    phone: '+216 71 385 339',
    fax: '+216 71 385 825',
    email: 'contact@vital.com.tn',
  },
  statistics: {
    products: 500,
    annual_production: "300 millions d'unités",
    employees: 400,
    management_percentage: 24,
    prescriptions: '1 ordonnance sur 3 en Tunisie',
  },
  certifications: ['ISO 9001', 'ISO 22000', 'ISO 22716', 'Halal'],
  product_ranges: [
    { name: 'Pédiakids', category: 'Enfants', description: 'Produits 100% naturels pour les enfants' },
    { name: 'Phytothéra', category: 'Généraliste', description: 'Gamme complète de compléments nutritionnels' },
    { name: 'Vitonic', category: 'Vitalité', description: 'Multivitamines avec minéraux et probiotiques' },
    { name: 'Omevie', category: 'Cardiovasculaire', description: 'Riche en Omega 3 et Vitamine E' },
    { name: 'Mincivit', category: 'Minceur', description: 'Draineurs et détoxifiants naturels' },
    { name: 'Minciligne', category: 'Minceur', description: 'Solutions minceur sous différentes formes' },
    { name: 'Oligovit', category: 'Immunité', description: 'Zinc, Vitamine C, Echinacée, Vitamine D3' },
    { name: 'Phytofane', category: 'Cheveux', description: 'Soins des cheveux et cuir chevelu' },
    { name: 'Cosmopharma', category: 'Peau', description: 'Soins spécialisés pour la peau' },
    { name: 'Uniderm', category: 'Hygiène', description: 'Savons dermatologiques adaptés à tous les types de peau' },
    { name: 'Bactol', category: 'Protection', description: 'Produits désinfectants' },
    { name: 'TC 2000', category: 'Peau', description: 'Soins dépigmentants naturels' },
    { name: 'Healthcare', category: 'Anti-âge', description: 'Compléments pour minceur et anti-âge' },
  ],
  health_needs: [
    'Articulation', 'Beauté et peau', 'Capital osseux', 'Carences', 'Circulation',
    'Energie', 'Enfants', 'Femme', 'Homme', 'Immunité', 'Mémoire et concentration',
    'Métabolisme', 'Minceur', 'Moral', 'Ongles et cheveux', 'Solaire',
    'Transit Gastro-intestinal', 'Voies urinaires',
  ],
};

const SYSTEM_INSTRUCTION = `Tu es VitAI, l'assistant virtuel officiel des Laboratoires Vital (Tunisie).
Tu es spécialiste des compléments alimentaires naturels à base de plantes.

INFORMATIONS CLÉS:
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

INSTRUCTIONS:
- Réponds toujours en français de manière professionnelle, rassurante et utile
- Sois bref par défaut: 2 à 4 phrases maximum si la question est simple
- Donne plus de détails uniquement si la question le demande ou si c'est nécessaire pour être utile
- Si la réponse peut être plus complète, structure-la avec de courts points clairs
- Termine parfois par une proposition courte comme: "Si vous voulez, je peux détailler davantage."
- Base tes réponses UNIQUEMENT sur les informations fournies ci-dessus
- Sois amical et patient avec les clients
- Fournis des informations de contact pertinentes
- Rappelle toujours: "Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien."
- Aide les clients à trouver les produits adaptés à leurs besoins
- Si une question n'est pas couverte par la base de connaissances, dis-le clairement`;

function normalizeMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === 'model' ? 'assistant' : 'user',
    content: message.text,
  }));
}

function buildContext(message: string) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('email')) {
    return 'Vous pouvez contacter Les Laboratoires VITAL au +216 71 385 339 ou par email à contact@vital.com.tn. L\'adresse est Z.I Ben Arous – Route Mornag – Ben Arous, Tunisie.';
  }

  if (lowerMessage.includes('certif') || lowerMessage.includes('qualité') || lowerMessage.includes('iso') || lowerMessage.includes('halal')) {
    return 'Les Laboratoires VITAL disposent des certifications ISO 9001, ISO 22000, ISO 22716 et Halal.';
  }

  if (lowerMessage.includes('immun') || lowerMessage.includes('défense')) {
    return `Pour l'immunité, la gamme Oligovit est adaptée. Elle contient notamment du zinc, de la vitamine C, de l'échinacée et de la vitamine D3. Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien.`;
  }

  if (lowerMessage.includes('minceur') || lowerMessage.includes('perte de poids')) {
    return `Pour les besoins minceur, Vital propose notamment Mincivit et Minciligne, deux gammes de solutions naturelles. Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien.`;
  }

  if (lowerMessage.includes('cheveu') || lowerMessage.includes('capill') || lowerMessage.includes('ongle')) {
    return `Pour les cheveux et les ongles, la gamme Phytofane est la plus adaptée parmi les informations disponibles. Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien.`;
  }

  if (lowerMessage.includes('peau') || lowerMessage.includes('derm') || lowerMessage.includes('cosmétique')) {
    return `Pour la peau, Vital propose notamment Cosmopharma, Uniderm et TC 2000 selon le besoin. Je ne suis pas un substitut à un avis médical. Consultez votre médecin ou pharmacien.`;
  }

  return 'Utilise les informations Vital fournies pour répondre précisément à la demande. Si tu ne peux pas confirmer un détail, dis-le clairement.';
}

function normalizeToProviderMessages(messages: ChatMessage[], userMessage: string) {
  const context = buildContext(userMessage);

  return [
    ...messages.map((message) => ({
      role: message.role === 'model' ? 'assistant' : 'user',
      content: message.text,
    })),
    {
      role: 'user',
      content: `${context}\n\nQuestion: ${userMessage}`,
    },
  ];
}

async function generateWithGroq(messages: ChatMessage[], userMessage: string) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is missing');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 900,
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...normalizeToProviderMessages(messages, userMessage),
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || errorData?.message || `Groq error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function generateWithGemini(messages: ChatMessage[], userMessage: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: [
        ...messages.map((message) => ({
          role: message.role === 'model' ? 'model' : 'user',
          parts: [{ text: message.text }],
        })),
        {
          role: 'user',
          parts: [{ text: `${buildContext(userMessage)}\n\nQuestion: ${userMessage}` }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 900,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || errorData?.message || `Gemini error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const providerOrder: ProviderName[] = (() => {
      const configured = (process.env.CHAT_PROVIDER || 'groq').toLowerCase();
      if (configured === 'gemini') return ['gemini', 'groq'];
      return ['groq', 'gemini'];
    })();

    let lastError: unknown = null;

    for (const provider of providerOrder) {
      try {
        const botResponse = provider === 'groq'
          ? await generateWithGroq(messages as ChatMessage[], userMessage)
          : await generateWithGemini(messages as ChatMessage[], userMessage);

        if (botResponse) {
          return NextResponse.json({
            success: true,
            message: botResponse,
            provider,
          });
        }
      } catch (error) {
        lastError = error;
        console.error(`${provider} chat error:`, error);
      }
    }

    return NextResponse.json(
      {
        error: `No AI provider responded. Last error: ${lastError instanceof Error ? lastError.message : 'unknown'}`,
      },
      { status: 503 }
    );

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
