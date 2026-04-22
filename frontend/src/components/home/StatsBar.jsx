import React from 'react';

const StatsBar = () => {
  const stats = [
    { num: "11", label: "Years", suffix: " Legacy" },
    { num: "52+", label: "Turnkey", suffix: " Projects" },
    { num: "100+", label: "Mills", suffix: " Installed" },
    { num: "5+", label: "Countries", suffix: " Served" },
    { num: "10+", label: "Mfg.", suffix: " Facility" },
    { num: "360°", label: "Solution", suffix: " Provider" }
  ];

  return (
    <div className="w-full bg-white border-t-[0.5px] border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto py-[28px] px-4 md:px-[5%]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 divide-x-[1px] divide-[#e2e8f0]">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-4 text-center">
              <div className="text-[36px] font-bold text-primary font-display leading-tight">
                {stat.num}
              </div>
              <div className="text-[12px] text-text-muted mt-1 uppercase tracking-wide font-medium">
                {stat.label}<br className="hidden md:block"/>{stat.suffix}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
