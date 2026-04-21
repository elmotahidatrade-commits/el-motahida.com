import React from 'react';
import { Grid, Search } from 'lucide-react';

const ProductFinder = () => {
  return (
    <section className="bg-[#0d2251] py-[40px] px-4 md:px-[5%] w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-x-3 mb-2">
            <div className="w-[32px] h-[32px] rounded border border-white/20 flex items-center justify-center">
              <Grid className="text-white w-4 h-4" />
            </div>
            <h2 className="text-[22px] font-semibold text-white font-display">Product Finder</h2>
          </div>
          <h3 className="text-[15px] text-white/80 font-medium">Technology-Driven Solutions Across Industries</h3>
          <p className="text-[13px] text-white/55 mt-1">Select your specifications below to find the perfect machinery for your plant.</p>
        </div>

        {/* Dropdowns Row */}
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <select className="flex-1 bg-white/5 border border-white/20 rounded-[6px] h-[44px] px-3 text-[14px] text-white/90 outline-none appearance-none cursor-pointer hover:border-white/40 focus:border-primary transition-colors">
            <option value="" className="text-gray-800">Select Industry / Category</option>
            <option value="paper" className="text-gray-800">Paper Mill Machinery</option>
            <option value="packaging" className="text-gray-800">Packaging Equipment</option>
          </select>
          <select className="flex-1 bg-white/5 border border-white/20 rounded-[6px] h-[44px] px-3 text-[14px] text-white/90 outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors">
            <option value="" className="text-gray-800">Select Machine Type</option>
          </select>
          <select className="flex-1 bg-white/5 border border-white/20 rounded-[6px] h-[44px] px-3 text-[14px] text-white/90 outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors">
            <option value="" className="text-gray-800">Select Capacity Range</option>
          </select>
          
          <button className="bg-primary hover:bg-[#0d47a1] text-white rounded-[6px] h-[44px] px-6 text-[14px] font-medium flex items-center justify-center gap-x-2 transition-colors lg:w-auto w-full">
            <Search size={16} />
            View Product
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-x-4 my-8">
          <div className="h-[1px] bg-white/20 flex-1"></div>
          <span className="text-[12px] text-white/40 uppercase tracking-widest font-semibold">OR</span>
          <div className="h-[1px] bg-white/20 flex-1"></div>
        </div>

        {/* Keyword Search Row */}
        <div className="flex w-full">
          <div className="bg-white/10 px-4 h-[44px] rounded-l-[6px] border border-r-0 border-white/20 flex items-center justify-center min-w-max">
            <span className="text-[13px] text-white/70">Search by keyword</span>
          </div>
          <input 
            type="text" 
            placeholder="e.g. Centrifugal Pump, Roller..." 
            className="flex-1 bg-white/[0.06] border border-r-0 border-l-0 border-white/10 text-white px-4 h-[44px] text-[14px] outline-none placeholder:text-white/30 focus:bg-white/10 transition-colors"
          />
          <button className="bg-primary hover:bg-[#0d47a1] text-white h-[44px] px-8 rounded-r-[6px] text-[14px] font-semibold transition-colors">
            Search
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductFinder;
