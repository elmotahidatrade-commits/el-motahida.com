import React, { useState } from 'react';
import { ArrowRight, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const ExploreMore = () => {
  const { img, setIsQuoteModalOpen } = useSite();

  const exploreCards = [
    { title: "Technical Papers", desc: "In-depth industrial engineering guides on mill installations, machinery maintenance, and technical best practices.", img: img('explore-01-technical-papers', "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80") },
    { title: "Case Studies", desc: "Real-world success stories from across the region, detailing our comprehensive turnkey mill solutions and ROI deliverables.", img: img('explore-02-case-studies', "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80") },
    { title: "Process Efficiency", desc: "Improving manufacturing performance through modern technology upgrades and system optimization for legacy mills.", img: img('explore-03-sustainability', "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80") },
    { title: "Careers", desc: "Join an elite engineering team driving innovation and excellence in the industrial manufacturing sector.", img: img('explore-04-career-opportunities', "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80") }
  ];

  const regions = ["Africa", "Europe", "India", "Latin America", "Middle East", "Russia", "South East Asia", "USA"];
  const [activeRegion, setActiveRegion] = useState("Middle East");

  const logos = [
    img('client-logo-01', "https://placehold.co/150"),
    img('client-logo-02', "https://placehold.co/150"),
    img('client-logo-03', "https://placehold.co/150"),
    img('client-logo-04', "https://placehold.co/150"),
    img('client-logo-05', "https://placehold.co/150"),
    img('client-logo-06', "https://placehold.co/150")
  ];

  return (
    <section>
      {/* SECTION A: Explore More */}
      <div className="bg-white py-[60px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[26px] font-bold text-primary font-display mb-8 relative">
            Explore More...
            <span className="absolute bottom-[-4px] left-0 w-[48px] h-[3px] bg-primary block"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {exploreCards.map((card, idx) => (
              <div key={idx} className="border border-borderC rounded-[8px] bg-white overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
                <div className="w-full h-[160px] overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 pt-4 pb-3 flex-1 flex flex-col">
                  <h3 className="text-[15px] font-semibold text-[#1a2035] mb-[6px] font-display">{card.title}</h3>
                  <p className="text-[12px] text-text-muted leading-[1.6] flex-1">{card.desc}</p>
                </div>
                <a href="#" className="mx-4 mb-4 border-[1.5px] border-primary text-primary px-4 py-2 rounded-[4px] text-[12px] font-semibold flex items-center justify-center gap-x-1 hover:bg-primary hover:text-white transition-colors w-fit group/btn">
                  Know more
                  <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION B: Global Client Network */}
      <div className="bg-bgLight py-[50px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-3">
                <img 
                  src={img('site-logo', null)} 
                  alt="EMT Logo" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <h2 className="text-[24px] font-bold text-[#1a2035] font-display">A Global Client Network</h2>
              </div>
              <p className="text-[13px] text-text-muted mt-1">Trusted by leading industrial mills across 5+ countries worldwide</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-[4px]">
              {regions.map(region => (
                <button 
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-[14px] py-[6px] rounded-full text-[12px] font-medium transition-colors border ${
                    activeRegion === region 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-300 text-[#4a5568] hover:bg-gray-50'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative mt-[20px]">
            {/* Arrows Outside */}
            <button className="absolute left-[-16px] md:left-[-40px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors z-10 hidden md:flex">
                <ChevronLeft size={16} />
            </button>
            <button className="absolute right-[-16px] md:right-[-40px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors z-10 hidden md:flex">
                <ChevronRight size={16} />
            </button>

            {/* Logos Inner */}
            <div className="bg-white border border-borderC rounded-[8px] p-[24px] w-full overflow-hidden">
              <div className="flex items-center justify-between min-w-max md:min-w-0 md:grid md:grid-cols-6 divide-x divide-borderC gap-x-0">
                {logos.map((logo, idx) => (
                  <div key={idx} className={`px-5 h-[60px] flex items-center justify-center ${idx === logos.length - 1 ? 'border-r-0' : ''}`}>
                    <img 
                      src={logo} 
                      alt="Client Logo" 
                      className="max-h-[30px] max-w-[80px] object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-x-[6px] mt-[16px]">
              <div className="w-[12px] h-[8px] bg-primary rounded-full transition-all"></div>
              <div className="w-[8px] h-[8px] bg-gray-300 rounded-full transition-all"></div>
              <div className="w-[8px] h-[8px] bg-gray-300 rounded-full transition-all"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: CTA Banner */}
      <div className="bg-primary py-[50px] px-4 md:px-[5%] w-full flex flex-col items-center justify-center text-center">
        <h2 className="text-[22px] md:text-[28px] font-bold text-white font-display leading-tight max-w-2xl mx-auto">
          Ready to Transform Your Production?<br className="hidden md:block"/> Let's Build Together.
        </h2>
        <button 
           onClick={() => setIsQuoteModalOpen(true)}
           className="mt-[24px] border-2 border-white/80 hover:bg-white hover:text-primary transition-colors text-white font-semibold rounded-[4px] px-[32px] py-[12px] text-[14px]">
          Enquire Now &rarr;
        </button>
      </div>

    </section>
  );
};

export default ExploreMore;
