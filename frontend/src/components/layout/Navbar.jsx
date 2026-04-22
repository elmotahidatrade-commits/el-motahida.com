import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Globe, ChevronDown, Search } from 'lucide-react';

const Navbar = () => {
  const { img, settings } = useSite();
  const [isSticky, setIsSticky] = useState(false);
  const siteName = settings?.siteName?.en || 'El-Motahida Trade Company';
  const siteSubtitle = "Industrial Excellence";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    'Home', 'Products', 'Solutions', 'Projects', 'About', 'Contact'
  ];

  return (
    <nav className={`w-full transition-all duration-300 z-40 ${isSticky ? 'fixed top-0 bg-[#0a1a3a]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'relative bg-[#0a1a3a] border-b border-white/10'} h-[64px] flex items-center justify-between px-4 md:px-10`}>
      
      {/* LOGO */}
      <div className="flex items-center gap-x-2 md:gap-x-3 group cursor-pointer">
        <div className="flex items-center gap-x-2">
          <img 
            src={img('site-logo', null)} 
            alt="EMT Logo" 
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <Globe size={20} className="text-[#3b82f6] transition-transform group-hover:rotate-12" />
        </div>
        <div className="flex flex-col max-w-[180px] md:max-w-none">
          <span className="font-display font-bold text-white text-[14px] md:text-[20px] leading-snug md:leading-tight tracking-tight uppercase">
            {siteName}
          </span>
          <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-tight mt-0.5">
            {siteSubtitle}
          </span>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-x-8">
        <a href="#about" className="text-[13px] font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors">About Us</a>
        <a href="#expertise" className="text-[13px] font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors">Expertise</a>
        <a href="#turnkey" className="text-[13px] font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors">Turnkey</a>
        <a href="#spare-parts" className="text-[13px] font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors">Spare Parts</a>
        <a href="#trusted" className="text-[13px] font-bold text-gray-300 uppercase tracking-wider hover:text-white transition-colors">Partner</a>
      </div>

      {/* RIGHT UTILITIES */}
      <div className="flex items-center gap-x-3 md:gap-x-5">
        <div className="bg-white/10 border border-white/20 rounded-full px-2 md:px-3 py-1 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
          <span className="text-[11px] md:text-[12px] font-semibold text-white">EN</span>
        </div>
        <div className="flex items-center gap-x-2 cursor-pointer group">
          <Search size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          <span className="hidden lg:inline text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors uppercase tracking-wider">ENTER</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
