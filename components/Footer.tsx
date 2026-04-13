import { Leaf, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 bg-white inline-block p-2 rounded">
              <Image 
                src="https://vital.com.tn/wp-content/uploads/2017/05/logo.png" 
                alt="Vital Laboratoires" 
                width={120} 
                height={120} 
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Laboratoires Vital, créateurs de bien-être au naturel depuis 2000. Leader africain en phytothérapie et compléments alimentaires.
            </p>
            <div className="flex flex-wrap gap-3">
              {['ISO 9001', 'ISO 22000', 'ISO 22716', 'Halal'].map(cert => (
                <span key={cert} className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-xs font-medium text-gray-300 border border-gray-700">
                  <CheckCircle2 size={14} className="text-green-500" /> {cert}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-green-400 transition-colors">Accueil</a></li>
              <li><a href="/nos-gammes" className="hover:text-green-400 transition-colors">Nos Gammes</a></li>
              <li><a href="/produits" className="hover:text-green-400 transition-colors">Produits</a></li>
              <li><a href="/a-propos" className="hover:text-green-400 transition-colors">À propos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Siège social: Z.I Ben Arous – Route Mornag</li>
              <li>contact@vital.com.tn</li>
              <li>+216 71 385 339</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Laboratoires Vital. Tous droits réservés. Développé par Webticos</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
