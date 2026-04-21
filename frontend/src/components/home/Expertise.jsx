import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const Expertise = () => {
  const { img } = useSite();

  const expertiseImages = [
    { title: "Pulp Machinery", img: img('extra-04', "https://images.unsplash.com/photo-1542744094-24638bfb6bb0?auto=format&fit=crop&q=80"), span: "row-span-2 col-span-1" },
    { title: "Paper Machine Solutions", img: img('expertise-02-paper-machine-solutions', "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"), span: "col-span-1" },
    { title: "Molded Fiber Tech", img: img('expertise-03-molded-fiber-tech', "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80"), span: "col-span-1" },
    { title: "Refining Systems", img: img('expertise-04-refining-systems', "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"), span: "col-span-1" },
    { title: "Agitators & Screens", img: img('expertise-05-agitators-screens', "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80"), span: "col-span-1" },
  ];

  const featuredProducts = [
    { title: "Double Disc Refiner", desc: "High efficiency refining with low energy consumption for various pulps.", img: img('product-01-double-disc-refiner', "https://images.unsplash.com/photo-1581091226033-bb2a4ce16e78?auto=format&fit=crop&q=80") },
    { title: "Pressure Screen", desc: "Advanced screening technology for excellent fiber quality.", img: img('product-02-pressure-screen', "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80") },
    { title: "High Density Cleaner", desc: "Removing heavy impurities efficiently from paper stock.", img: img('product-03-high-density-cleaner', "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80") },
    { title: "Pulper Automation", desc: "Smart D Type Pulpers engineered for rapid disintegration.", img: img('product-04-pulper-automation', "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80") },
  ];

  return (
    <section>
      {/* SECTION A: EXPERTISE */}
      <div className="bg-bgLight py-[70px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-[30%] flex flex-col">
            <span className="text-[12px] text-text-muted tracking-[0.08em] uppercase font-bold mb-2">— What we offer</span>
            <h2 className="text-[26px] font-bold text-[#1a2035] mb-4 font-display leading-[1.2]">
              Our <span className="text-primary relative inline-block">
                Expertise
                <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-primary"></span>
              </span>
            </h2>
            <p className="text-[14px] text-text-mid leading-[1.7] max-w-[220px] mb-8 font-sans">
              Comprehensive industrial solutions engineered with decades of precision.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-b md:border-b-0 border-r border-[#e2e8f0] pb-4 md:pb-0 pr-4">
                <div className="text-[22px] font-bold text-primary font-display">50+</div>
                <div className="text-[12px] text-text-muted font-medium">Years Legacy</div>
              </div>
              <div className="border-b md:border-b-0 border-[#e2e8f0] pb-4 md:pb-0">
                <div className="text-[22px] font-bold text-primary font-display">500+</div>
                <div className="text-[12px] text-text-muted font-medium">Projects</div>
              </div>
              <div className="border-r border-[#e2e8f0] pt-4 pr-4">
                <div className="text-[22px] font-bold text-primary font-display">75+</div>
                <div className="text-[12px] text-text-muted font-medium">Countries</div>
              </div>
              <div className="pt-4">
                <div className="text-[22px] font-bold text-primary font-display">6</div>
                <div className="text-[12px] text-text-muted font-medium">Solutions</div>
              </div>
            </div>

            <button className="bg-primary hover:bg-[#0d47a1] text-white px-5 py-[10px] rounded-[4px] text-[13px] font-semibold w-fit transition-colors">
              Read More... &rarr;
            </button>
          </div>

          {/* Right Grid */}
          <div className="w-full md:w-[70%] grid grid-cols-3 grid-rows-2 gap-[3px]">
            {expertiseImages.map((item, idx) => (
              <div key={idx} className={`relative overflow-hidden group min-h-[160px] ${item.span}`}>
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-[13px] font-semibold text-white drop-shadow-md leading-tight max-w-[80%] font-display tracking-wide">{item.title}</span>
                  <Play size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* SECTION B: DISCOVER OUR BEST PRODUCTS */}
      <div className="bg-white py-[70px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10">
            <span className="text-[11px] text-primary tracking-[0.1em] font-bold uppercase mb-2 block">— FEATURED PRODUCTS</span>
            <h2 className="text-[30px] font-bold text-navy-deep leading-tight font-display mb-3">
              Discover Our Best <span className="text-primary relative inline-block">
                Products
                <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-primary"></span>
              </span>
            </h2>
            <p className="text-[14px] text-text-mid max-w-[480px]">
              Explore our line of high-performance machinery, designed to maximize throughput while minimizing energy requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="border border-borderC rounded-[8px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(21,101,192,0.12)] transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="w-full h-[160px] overflow-hidden">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[15px] font-semibold text-[#1a2035] font-display">{product.title}</h3>
                  <p className="text-[13px] text-text-muted leading-[1.6] my-2 flex-1">{product.desc}</p>
                  <div className="flex items-center text-[13px] text-primary font-medium mt-1">
                    View Details
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-[3px] transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;
