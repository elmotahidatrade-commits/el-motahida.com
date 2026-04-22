import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const TrustedPartner = () => {
  const { img } = useSite();

  const cards = [
    { title: "26 agate & Pin", desc: "Technical spare part: 26 agate & Pin.", img: img('26-agate-pin', null) },
    { title: "Coated Teflon Mould", desc: "High-precision coated teflon mould.", img: img('coated-teflon-mould', null) },
    { title: "Male Press", desc: "Core machinery unit: Male Press.", img: img('male-press', null) },
    { title: "Fine industrial Pin", desc: "Micro-component: Fine industrial Pin.", img: img('fine-industrial-pin', null) },
    { title: "Circular Knife", desc: "Industrial cutting tool: Circular Knife.", img: img('circular-knife', null) },
    { title: "Holders Four Holes", desc: "Precision part holder set (4 holes).", img: img('holders-four-holes', null) },
  ];

  return (
    <section id="trusted" className="bg-gradient-to-br from-[#0d2251] to-[#0a1a3a] text-white">
      {/* Top Description Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-[5%] pt-[60px] pb-[40px]">
        <h2 className="text-[28px] font-bold font-display text-white">Your Trusted Partner for Complete Projects</h2>
        <div className="h-[2px] bg-primary w-[60px] my-[12px]" />
        <p className="text-[14px] text-white/70 max-w-[600px] mb-8 leading-relaxed font-sans">
          We leverage integrated engineering strategies to guide our clients towards sustainable industrial success, minimizing risks while increasing output quality.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {[
            "End-to-End Solutions", 
            "Single Point Responsibility",
            "In-House Engineering", 
            "Proven Project Execution", 
            "Timely Project Delivery"
          ].map(feature => (
            <div key={feature} className="flex items-center gap-x-2">
              <div className="w-[8px] h-[8px] rounded-full bg-accent shrinks-0"></div>
              <span className="text-[13px] text-white/85 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Grid Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-[5%] pb-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <div key={idx} className="group bg-white/5 border border-white/10 rounded-[8px] overflow-hidden flex flex-col transition-colors hover:border-white/20">
              
              <div className="relative w-full h-[200px] overflow-hidden">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-[#1565C0]/15 transition-colors duration-300" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-[17px] font-semibold text-[#60a5fa] group-hover:underline decoration-1 underline-offset-4 cursor-pointer font-display">
                  {card.title}
                </h3>
                <p className="text-[13px] text-white/65 leading-[1.65] my-2 flex-1 font-sans">
                  {card.desc}
                </p>
                <div className="flex items-center text-[13px] text-[#90caf9] font-medium cursor-pointer mt-2 group/link">
                  Learn More
                  <ArrowRight size={14} className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;
