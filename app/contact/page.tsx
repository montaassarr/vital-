import { MapPin, Phone, Printer, Mail, Building2, Warehouse, FlaskConical, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-white py-8 border-b border-gray-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light text-gray-800">Contact</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Information (Left Side) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-medium text-[#39b54a] mb-6">Nos Coordonnées</h2>
              <p className="text-gray-600 mb-8">
                N'hésitez pas à nous contacter ou à nous rendre visite. Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
            </div>

            <div className="space-y-6">
              {/* Bureau Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg text-[#8e3a80]">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#8e3a80]">Bureau</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>Z.I Ben Arous – Route Mornag – Ben Arous</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 71 385 339</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Printer size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 71 385 825</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={20} className="text-gray-400 shrink-0" />
                    <a href="mailto:contact@vital.com.tn" className="text-[#8e3a80] hover:underline">contact@vital.com.tn</a>
                  </li>
                </ul>
              </div>

              {/* Entrepôt Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg text-[#39b54a]">
                    <Warehouse size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#39b54a]">Entrepôt de stockage</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>Z.I Mornag – Errisala</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 71 385 339</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Printer size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 79 396 081</span>
                  </li>
                </ul>
              </div>

              {/* Laboratoire Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                    <FlaskConical size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Laboratoire</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>Avenue Bahri – Boumhel – Ben Arous</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 71 386 016</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Printer size={20} className="text-gray-400 shrink-0" />
                    <span>(+216) 71 216 900</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 sticky top-32">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Envoyez-nous un message</h2>
                <p className="text-gray-500 italic">
                  Merci de bien vouloir remplir ce formulaire si vous souhaitez de plus amples informations.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom et Prénom <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#39b54a] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#39b54a] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="john@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#39b54a] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Sujet
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#39b54a] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Votre message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#39b54a] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-4 bg-[#8e3a80] hover:bg-purple-900 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>ENVOYER</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
