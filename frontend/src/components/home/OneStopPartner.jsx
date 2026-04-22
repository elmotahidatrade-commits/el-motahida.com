import { ArrowRight, Check } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const OneStopPartner = () => {
  const { img } = useSite();

  return (
    <section id="about" className="bg-white py-[80px] px-4 md:px-[5%] w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Photo Frame */}
        <div className="relative rounded-[12px] overflow-hidden shadow-2xl h-full min-h-[450px] border border-white/10 group">
          <img 
            src={img('about-us-hero', "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80")} 
            alt="El-Motahida Trade Industrial Excellence" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1a3a]/60 via-[#0a1a3a]/20 to-transparent mix-blend-multiply" />
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-navy-deep leading-tight font-display">
            Your Premium <span className="text-primary">Industrial</span> Technology Partner
          </h2>
          <h3 className="text-[17px] text-primary/90 font-semibold mt-3 mb-5 font-sans">
            Quality you can trust — innovation you can rely on.
          </h3>
          <div className="text-[15px] text-text-muted leading-[1.8] font-sans space-y-4">
            <p>
              El-Motahida Trade Company provides high-quality industrial products, specialized tools, and professional work equipment designed to elevate your manufacturing operations.
            </p>
            <p>
              With decades of engineering excellence, we deliver complete turnkey solutions from initial concept to full-scale commissioning, ensuring optimal performance for every project.
            </p>
          </div>

          {/* Pills Row */}
          <div className="flex flex-wrap gap-[12px] mt-6">
            {[
              "Industrial R&D", 
              "Precision Foundry", 
              "Premium Engineering", 
              "Safe Operations"
            ].map(item => (
              <div key={item} className="border-[1.5px] border-primary/20 bg-primary/5 rounded-full px-[16px] py-[8px] text-primary text-[13px] font-bold flex items-center gap-x-2 transition-colors hover:bg-primary/10">
                <div className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse"></div>
                {item}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-primary hover:bg-[#0d47a1] transition-all transform hover:-translate-y-1 text-white px-8 py-3.5 rounded-[6px] font-bold text-[14px] flex items-center justify-center gap-x-2 mt-8 w-fit shadow-lg shadow-primary/25">
            Discover Our Story
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OneStopPartner;
