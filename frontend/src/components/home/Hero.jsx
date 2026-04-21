import React, { useState } from 'react';
import { ArrowRight, Play, Mouse, X } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const Hero = () => {
  const { img, settings, setIsQuoteModalOpen } = useSite();
  const siteTitle = settings?.siteName?.en || 'El-Motahida Trade Company';
  const siteTagline = "Industrial Manufacturing & Work Equipment";

  return (
    <div className="relative w-full h-[calc(100vh-36px)] bg-navy-deep overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src={img('site-video', '')} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70 mix-blend-luminosity brightness-90 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-[#050f1e]/65 shadow-[inset_0_0_150px_rgba(21,101,192,0.25)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-[800px]">
            <h1 className="text-white font-display font-bold text-[clamp(28px,4.5vw,58px)] leading-[1.1] tracking-tight">
              {siteTitle}<br />
              <span className="text-[0.6em] opacity-90 font-medium block mt-1 tracking-normal">{siteTagline}</span>
            </h1>
            <p className="text-white/80 text-[18px] max-w-[580px] mt-8 leading-relaxed font-sans italic border-l-2 border-primary pl-6 py-2">
              "Quality you can trust — innovation you can rely on."
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 mt-10">
              <button 
                 onClick={() => setIsQuoteModalOpen(true)}
                 className="bg-primary hover:bg-[#0d47a1] transition-all transform hover:scale-105 text-white px-10 py-4 rounded-md font-bold text-[15px] flex items-center justify-center gap-x-3 shadow-2xl shadow-primary/30"
              >
                Request a Quote
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-y-2 opacity-60 animate-bounce cursor-pointer">
        <Mouse size={26} className="text-white" />
      </div>
    </div>
  );
};

export default Hero;
