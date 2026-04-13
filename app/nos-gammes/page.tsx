import { Leaf } from 'lucide-react';

export default function NosGammes() {
  const gammes = [
    {
      name: "Pédiakids",
      description: "Une sélection de produits pour enfants, avec des actifs 100% naturels comme des extraits de plantes, des vitamines et des minéraux pour remédier naturellement aux symptômes et pathologies des nourrissons et des enfants.",
      logo: <span className="text-4xl font-bold"><span className="text-[#00a3e0]">Pédia</span><span className="text-[#e6007e]">KIDS</span></span>
    },
    {
      name: "Laboratoires Vital",
      description: "Des associations d'extraits secs de plantes offrant des solutions thérapeutiques efficaces.",
      logo: <span className="text-6xl font-bold text-gray-500 tracking-tighter">LV</span>
    },
    {
      name: "Phytothéra",
      description: "Une large gamme de compléments nutritionnels 100% naturels qui offre une réponse à chaque besoin selon les propriétés thérapeutiques de chaque plante. La gamme Phytothéra permet de remédier aux problèmes de santé du quotidien de manière naturelle.",
      logo: <span className="text-4xl font-bold text-[#0054a6] flex items-center gap-1">Phytothera <Leaf className="text-[#8dc63f]" size={32} /></span>
    },
    {
      name: "Vitonic",
      description: "Une gamme complète de multivitamines associé à des minéraux, des extraits de plantes, des probiotiques et des prébiotiques pour retrouver votre vitalité et bien-être au quotidien.",
      logo: <span className="text-5xl font-bold text-[#1d2088] relative">V<span className="text-red-500 absolute -top-1 left-4 text-2xl">•</span><span className="text-red-500 absolute bottom-1 left-2 text-xl">◡</span>itonic</span>
    },
    {
      name: "Omevie",
      description: "Une gamme de compléments alimentaires riche en Omega 3 et vitamine E, indispensables au renforcement de l'immunité, l'équilibre émotionnel, la prévention des maladies cardio-vasculaires et au développement cérébral.",
      logo: <span className="text-5xl font-bold text-[#1d2088]">O<span className="text-[#f39200]">mevie</span></span>
    },
    {
      name: "Planthérapie",
      description: "État grippal, toux grasse, toux sèche, nez bouché, maux de gorge, maux de tête ! La gamme Planthérapie des Laboratoires Vital réservée à l'adulte vous apporte des solutions naturelles sous différentes formes à titre préventif et curatif pour vous rétablir rapidement.",
      logo: <span className="text-4xl font-bold text-[#8e3a80]">Planthérapie</span>
    },
    {
      name: "Mincivit",
      description: "Découvrez une sélection de draineurs et de détoxifiant à base d'ingrédients naturels pour éliminer efficacement les graisses, perdre quelques centimètres de tour de taille ou de cuisses et retrouver un corps de rêve.",
      logo: <span className="text-4xl font-bold text-[#662483]">MINCIVIT</span>
    },
    {
      name: "Bactol",
      description: "Découvrez tous nos produits désinfectants pour vous protéger et lutter contre la propagation du coronavirus.",
      logo: <span className="text-5xl font-bold text-[#1d2088]">Bact<span className="text-red-500">o</span>l</span>
    },
    {
      name: "Minciligne",
      description: "Une gamme minceur spécifique sous différentes formes (gélule, solution buvable) vous permettant de perdre du poids et éliminer les graisses.",
      logo: <span className="text-4xl font-bold"><span className="text-[#e6007e]">MINCI</span><span className="text-gray-500 italic font-light">ligne</span></span>
    },
    {
      name: "Uniderm",
      description: "Conçues pour l'hygiène quotidienne de votre peau. Les savons dermatologiques de la gamme Uniderm est adapté à chaque type de peau.",
      logo: (
        <div className="w-32 h-32 rounded-full border-4 border-[#00a3e0] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
          <div className="text-center z-10">
            <div className="text-2xl font-bold text-[#1d2088] leading-none">UNI</div>
            <div className="text-sm font-bold text-[#1d2088] tracking-widest">DERM</div>
          </div>
        </div>
      )
    },
    {
      name: "Cosmopharma",
      description: "Afin de prendre soin de votre peau, les Laboratoires Vital ont concocté pour vous une gamme de soins spécialisée dans la prise en charge des besoins spécifiques de votre peau : Hydratation - Traitement - Protection - Hygiène",
      logo: (
        <div className="flex flex-col items-center">
          <div className="border-4 border-gray-800 p-2 rounded-lg mb-2">
            <span className="text-4xl font-bold text-gray-800">CP</span>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-widest">COSMOPHARMA</span>
        </div>
      )
    },
    {
      name: "Oligovit",
      description: "Zinc, Vitamine C, Echinacée, Vitamine D3 ! Découvrez la gamme complète des Laboratoires Vital pour renforcer votre immunité.",
      logo: <span className="text-5xl font-bold text-[#1d2088] tracking-widest">OLIGOVIT</span>
    },
    {
      name: "TC 2000",
      description: "Des soins dépigmentant naturels et non irritant pour un éclaircissement garanti de votre peau.",
      logo: <span className="text-5xl font-bold text-[#1d2088]">TC 2000</span>
    },
    {
      name: "FERBIOTIC",
      description: "Des associations d'extraits secs de plantes offrant des solutions thérapeutiques efficaces.",
      logo: (
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-[#b31b1b] leading-none">FER</span>
          <span className="text-4xl font-bold text-[#b31b1b]">BIOTIC</span>
        </div>
      )
    },
    {
      name: "PHYTOL",
      description: "Découvrez notre gamme bucco-dentaire complète, spécialement conçue pour prendre soin de votre santé dentaire et buccale. Avec des produits de qualité et des formules innovantes, notre gamme vous offre une solution adaptée à tous vos besoins.",
      logo: <span className="text-5xl font-bold text-[#1b5e20] tracking-wider">PHYTOL</span>
    },
    {
      name: "Vitosine",
      description: "Solution cutanée asséchante : Nettoyer et assécher la peau",
      logo: <span className="text-5xl font-bold text-[#1d2088]"><span className="text-red-600">V</span>itosine</span>
    },
    {
      name: "CALMOSS",
      description: "Découvrez Calmoss, notre gamme vous offre une solution adaptée à tous vos besoins.",
      logo: <span className="text-5xl font-bold text-[#1d2088] tracking-widest">CALMOSS</span>
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light text-gray-800">Nos gammes</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-medium text-[#8dc63f] mb-8">Créateurs de bien-être au naturel</h2>
        <p className="text-gray-700 mb-6 text-lg">
          Les Laboratoires Vital vous proposent des gammes de compléments alimentaires de haute qualité, formulés à partir d'ingrédients labellisés, standardisés, bien documentés selon les recommandations.
        </p>
        <p className="text-gray-900 font-bold text-lg">
          Tous nos produits sont développés et testés avec le plus grand soin, dans un souci permanent d'excellence et de perfection.
        </p>
      </div>

      <div className="flex flex-col">
        {gammes.map((gamme, index) => (
          <div key={gamme.name} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 flex justify-center items-center min-h-[150px]">
                {gamme.logo}
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{gamme.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {gamme.description}
                </p>
                <button className="bg-[#8e3a80] text-white px-6 py-2.5 rounded hover:bg-purple-900 transition-colors text-sm font-medium">
                  Découvrir la gamme
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
