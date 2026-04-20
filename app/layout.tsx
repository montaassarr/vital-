import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Laboratoires Vital',
  description: 'Créateurs de bien-être au naturel',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning className="min-h-screen bg-white font-sans text-gray-800 selection:bg-green-200 flex flex-col">
        <Chatbot />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
