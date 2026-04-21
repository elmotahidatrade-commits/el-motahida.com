import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MessageSquare, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const TurnkeyProjects = () => {
  const { img } = useSite();

  return (
    <section className="relative w-full h-[420px] bg-navy-mid">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url('${img('project-01-paper-mill-mena', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')}')` }}
          >
            <div className="absolute inset-0 bg-[#081228]/60" />
            
            {/* Top Left Badge */}
            <div className="absolute top-6 left-6 md:left-[5%] bg-[#1565C0]/85 rounded-[4px] px-[10px] py-[4px] text-[11px] text-white font-semibold flex items-center z-10">
              10 TPD Capacity
            </div>

            {/* Bottom Left Content */}
            <div className="absolute bottom-10 left-6 md:left-[5%] z-10 w-full max-w-[500px]">
              <h2 className="text-[30px] font-bold text-white mb-3 font-display leading-tight shadow-sm">
                Advanced Paper Mill Installation in MENA Region
              </h2>
              <p className="text-[14px] text-white/75 leading-[1.7] max-w-[460px] font-sans">
                Full-scale implementation from civil engineering to final machinery handover. Achieved top-tier energy efficiency and 100% automated control.
              </p>
              <button className="mt-6 border-[1.5px] border-white/70 hover:bg-white hover:text-navy-deep transition-colors rounded-[4px] text-white font-medium text-[14px] px-[22px] py-[10px] flex items-center gap-x-2">
                <MessageSquare size={16} />
                Inquire Now
              </button>
            </div>
            
          </div>
        </SwiperSlide>
        {/* Duplicate slides can be added here for testing */}
      </Swiper>

      {/* Slide Counter & Controls - Absolute over Swiper */}
      <div className="absolute top-6 right-6 md:right-[5%] z-10 flex items-center gap-x-4">
        <span className="text-[13px] text-white tracking-widest font-medium">01 / 08</span>
        <button className="w-[28px] h-[28px] rounded-full border border-white/50 flex items-center justify-center hover:bg-white/20 transition">
          <Pause size={12} fill="white" className="text-white" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 w-full px-4 md:px-[5%] flex justify-between items-center z-10 pointer-events-none">
        <button className="swiper-prev w-[36px] h-[36px] border border-white/40 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white/20 transition-colors group">
          <ChevronLeft className="text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button className="swiper-next w-[36px] h-[36px] border border-white/40 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white/20 transition-colors group">
          <ChevronRight className="text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Pagination Container */}
      <div className="absolute bottom-6 w-full flex justify-center z-10">
        <div className="custom-swiper-pagination flex gap-x-[6px]" />
      </div>

      <style jsx="true">{`
        .custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .custom-bullet-active {
          background: #1565C0 !important;
        }
      `}</style>
    </section>
  );
};

export default TurnkeyProjects;
