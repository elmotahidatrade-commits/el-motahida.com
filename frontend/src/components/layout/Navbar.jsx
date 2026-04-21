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
    <nav className={`w-full bg-white transition-all duration-300 z-40 ${isSticky ? 'fixed top-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'relative'} h-[64px] flex items-center justify-between px-4 md:px-10`}>
      
      {/* LOGO */}
      <div className="flex items-center gap-x-3 group cursor-pointer">
        <img 
          src={img('site-logo', null)} 
          alt="EMT Logo" 
          className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="flex flex-col">
          <span className="font-display font-bold text-navy-deep text-[14px] md:text-[18px] leading-tight tracking-tight">
            {siteName}
          </span>
          <span className="hidden md:block text-[10px] text-primary font-bold uppercase tracking-[0.2em] leading-tight opacity-80">
            {siteSubtitle}
          </span>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-x-[16px]">
        {navLinks.map((link) => (
          <div key={link} className="flex items-center gap-x-1 cursor-pointer group">
            <span className="text-[14px] text-[#1a2035] font-medium group-hover:text-primary transition-colors">
              {link}
            </span>
            <ChevronDown size={14} className="text-[#1a2035] group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>

      {/* RIGHT UTILITIES */}
      <div className="flex items-center gap-x-3 md:gap-x-5">
        <div className="bg-bgLight border border-borderC rounded-full px-2 md:px-3 py-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
          <span className="text-[11px] md:text-[12px] font-semibold text-text-dark">EN</span>
        </div>
        <div className="flex items-center gap-x-2 cursor-pointer group">
          <Search size={18} className="text-text-dark group-hover:text-primary transition-colors" />
          <span className="hidden lg:inline text-[13px] font-medium text-text-dark group-hover:text-primary transition-colors uppercase tracking-wider">ENTER</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
