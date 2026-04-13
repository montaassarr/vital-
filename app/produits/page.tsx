import Image from 'next/image';
import { Search, ChevronLeft } from 'lucide-react';

export default function Produits() {
  const products = [
    { name: "Pédiakids Varispray", category: "Spray", image: "pediakids", badges: ["BOUFFÉES DE CHALEUR", "MÉNOPAUSE", "SUEURS NOCTURNES"] },
    { name: "FONGIDERM Antifongique Crème", category: "Crème", image: "fongiderm", badges: ["ANTIFONGIQUE", "DÉMANGEAISONS", "MYCOSE"] },
    { name: "Pulmax Kids", category: "Sirop", image: "pulmax", badges: ["IMMUNITÉ", "TOUX"] },
    { name: "PHYTOFANE Antipelliculaire", category: "Gélules", image: "phytofane", badges: ["ANTIPELLICULAIRE", "CHUTE DE CHEVEUX", "DÉMANGEAISONS", "PURETÉ"] },
    { name: "FerBiotic Lipo", category: "Gélules", image: "ferbiotic", badges: ["CARENCE EN FER", "IMMUNITÉ"] },
    { name: "PHYTOFANE Anti Chute", category: "Gélules", image: "phytofane-chute", badges: ["CHUTE DE CHEVEUX"] },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Green Header Banner */}
      <div className="bg-gradient-to-r from-[#4a8f3c] via-[#6ab04c] to-[#4a8f3c] h-16 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium">
              <ChevronLeft size={20} className="mr-1" />
              Retour au catalogue
            </button>

            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Affinez votre sélection avec la recherche par filtre</p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Recherche..." 
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#39b54a] focus:border-[#39b54a]"
                />
                <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Gammes</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gamme" className="text-[#8e3a80] focus:ring-[#8e3a80]" defaultChecked />
                  <span className="text-sm text-gray-700 group-hover:text-[#8e3a80]">Toutes les gammes</span>
                </label>
                {["Vitonic", "Uniderm", "TC 2000", "Sweet", "Pulmax", "Planthérapie", "Phytothéra", "Phytol", "Pédiakids", "Omevie", "Oligovit", "Mincivit", "Minciligne", "Laboratoires Vital", "HealthCare", "Cosmopharma", "Bactol"].map(gamme => (
                  <label key={gamme} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="gamme" className="text-[#8e3a80] focus:ring-[#8e3a80]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#8e3a80]">{gamme}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Besoins</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {["Voies Urinaires", "Transit Gastro-intestinal", "Solaire", "Ongles et Cheveux", "Moral", "Minceur", "Mémoire et concentration", "Métabolisme", "Immunité", "Homme", "Femme", "Energie", "Enfant", "Circulation", "Capital osseux", "Beauté et peau", "Articulation"].map(besoin => (
                  <label key={besoin} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="text-[#8e3a80] focus:ring-[#8e3a80] rounded-sm" />
                    <span className="text-sm text-gray-600 group-hover:text-[#8e3a80]">{besoin}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.name} className="flex flex-col group cursor-pointer bg-white">
                  <div className="h-64 w-full relative mb-4 flex items-center justify-center p-4">
                    <Image 
                      src={`https://picsum.photos/seed/${product.image}/300/400`} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-[#8e3a80] transition-colors line-clamp-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {product.badges.map(badge => (
                      <span key={badge} className="text-[10px] font-bold text-white bg-[#8e3a80] px-2 py-1 rounded-sm tracking-wider">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
