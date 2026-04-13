import { Search, Facebook, Linkedin, Youtube, Instagram, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="https://vital.com.tn/wp-content/uploads/2017/05/logo.png" 
              alt="Vital Laboratoires" 
              width={100} 
              height={100} 
              className="object-contain"
              unoptimized
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-[#8e3a80] font-semibold text-sm tracking-wider transition-colors focus:text-[#8e3a80]">ACCUEIL</Link>
            <Link href="/nos-gammes" className="text-gray-500 hover:text-[#8e3a80] font-semibold text-sm tracking-wider transition-colors focus:text-[#8e3a80]">NOS GAMMES</Link>
            <Link href="/produits" className="text-gray-500 hover:text-[#8e3a80] font-semibold text-sm tracking-wider transition-colors focus:text-[#8e3a80]">PRODUITS</Link>
            <Link href="/a-propos" className="text-gray-500 hover:text-[#8e3a80] font-semibold text-sm tracking-wider transition-colors focus:text-[#8e3a80]">À PROPOS</Link>
            <Link href="/contact" className="text-gray-500 hover:text-[#8e3a80] font-semibold text-sm tracking-wider transition-colors focus:text-[#8e3a80]">CONTACT</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="text-[#8e3a80] hover:text-purple-900 transition-colors">
              <Search size={20} strokeWidth={3} />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <a href="#" className="bg-gray-400 text-white p-1.5 rounded-full hover:bg-gray-500 transition-colors"><Facebook size={16} /></a>
              <a href="#" className="bg-gray-400 text-white p-1.5 rounded-full hover:bg-gray-500 transition-colors"><Linkedin size={16} /></a>
              <a href="#" className="bg-gray-400 text-white p-1.5 rounded-full hover:bg-gray-500 transition-colors"><Youtube size={16} /></a>
              <a href="#" className="bg-gray-400 text-white p-1.5 rounded-full hover:bg-gray-500 transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
