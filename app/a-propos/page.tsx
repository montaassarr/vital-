import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export default function APropos() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light text-gray-800">À propos</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-600">
          <h2 className="text-3xl font-medium text-[#39b54a] mb-6">Notre Histoire</h2>
          <p className="mb-6">
            Fondé en 2000 en Tunisie, Vital est un laboratoire pharmaceutique spécialisé dans le domaine de la phytothérapie, thérapie, bien-être, et cosmétologie.
          </p>
          <p className="mb-12">
            Vital est aujourd'hui le leader africain des compléments alimentaires naturels à base de plantes. Depuis 20 ans, nous transformons les plantes en solutions de santé efficaces, en combinant science, origine maîtrisée et parfaite sécurité.
          </p>

          <h2 className="text-3xl font-medium text-[#39b54a] mb-6">Certification & Normalisation</h2>
          <p className="mb-6">
            L'obtention du Certificat de Vente Libre (CVL) est accordée par les autorités compétentes suite à l'analyse du produit fini auprès d'un laboratoire accrédité et reconnu (Veritas). Ce dernier sous-réserve de conformité du complément alimentaire ou du produit de soin (Bulletin d'analyse) et suite à une inspection, fournit un "certificat de conformité" du produit.
          </p>
          <p className="mb-12">
            Les Laboratoires VITAL suivent cette démarche de normalisation dans le cadre de sa volonté du respect des standards de conformité de ses compléments alimentaires avec les normes tunisiennes et les lois en vigueurs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <ShieldCheck className="text-[#39b54a] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Qualité Garantie</h3>
              <p className="text-sm">Tous nos produits sont développés et testés avec le plus grand soin, dans un souci permanent d'excellence et de perfection.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <Award className="text-[#39b54a] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Certifications</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> ISO 9001</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> ISO 22000</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> ISO 22716</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Halal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
