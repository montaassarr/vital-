import Image from 'next/image';
import { Flag, ShieldCheck, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-48 md:h-64 bg-gradient-to-r from-[#4a8f3c] via-[#6ab04c] to-[#4a8f3c] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/leaves/1920/400')] bg-cover bg-center mix-blend-overlay"></div>
        <h1 className="relative text-3xl md:text-4xl text-white font-medium tracking-wide z-10">
          LABORATOIRES VITAL
        </h1>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium mb-8">
          <span className="italic text-gray-800">Laboratoires Vital, </span>
          <span className="italic text-[#39b54a]">Créateurs de bien-être au naturel !</span>
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Fondé en 2000 en Tunisie, Vital est un laboratoire pharmaceutique spécialisé dans le domaine de la phytothérapie, thérapie, bien-être, et cosmétologie.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Vital est aujourd'hui le leader africain des compléments alimentaires naturels à base de plantes.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="text-[#39b54a] mb-4">
              <Flag size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-gray-800 mb-4">Leader</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              dans la production et la commercialisation des compléments alimentaires en Tunisie et sur le nord Afrique
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#39b54a] mb-4">
              <Leaf size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-gray-800 mb-4">20 ans d'expertise</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Depuis 2000, nous transformons les plantes en solutions de santé efficaces, en combinant science, origine maîtrisée et parfaite sécurité.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#39b54a] mb-4">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-gray-800 mb-4">Laboratoire engagé</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Nous nous engageons auprès des professionnels de la santé et patients pour proposer des produits naturels de qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl mb-6">
            <span className="italic text-[#39b54a]">CERTIFICATION </span>
            <span className="text-gray-800">& </span>
            <span className="italic text-[#39b54a]">NORMALISATION</span>
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Respect des standards et bonnes pratiques de fabrication des compléments alimentaires des Laboratoires VITAL.
          </p>
          <button className="bg-[#8e3a80] text-white px-6 py-2.5 rounded hover:bg-purple-900 transition-colors text-sm font-medium">
            En savoir plus
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-48 h-48 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-300">Image Certification</span>
          </div>
        </div>
      </section>

      {/* Questionnaire Section */}
      <section className="py-16 text-center">
        <h2 className="text-2xl italic text-[#39b54a] mb-4">Questionnaire sympo vital</h2>
        <p className="text-gray-600 mb-8">Vous pouvez participer à notre questionnaire en cliquant ci-dessous.</p>
        <button className="bg-[#8e3a80] text-white px-6 py-2.5 rounded hover:bg-purple-900 transition-colors text-sm font-medium">
          Questionnaire
        </button>
      </section>

      {/* Products Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#39b54a] mb-16">Nos Produits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Product 1 */}
          <div className="flex flex-col items-center">
            <div className="h-64 w-full relative mb-6">
              <Image src="https://picsum.photos/seed/tetrab/300/400" alt="Tetra B" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tetra B</h3>
            <p className="text-gray-400 text-sm">Carences</p>
          </div>
          
          {/* Product 2 */}
          <div className="flex flex-col items-center">
            <div className="h-64 w-full relative mb-6">
              <Image src="https://picsum.photos/seed/mincicare/300/400" alt="Mincicare 4 actions" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mincicare 4 actions</h3>
            <p className="text-gray-400 text-sm">Minceur</p>
          </div>
          
          {/* Product 3 */}
          <div className="flex flex-col items-center">
            <div className="h-64 w-full relative mb-6">
              <Image src="https://picsum.photos/seed/apitou/300/400" alt="Apitou n°1" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Apitou n°1</h3>
            <p className="text-gray-400 text-sm">Enfant</p>
          </div>
        </div>

        <h3 className="text-2xl font-medium text-gray-800">
          Une <span className="text-[#39b54a] font-bold">solution naturelle</span> pour chacun de vos besoins
        </h3>
      </section>
    </>
  );
}
