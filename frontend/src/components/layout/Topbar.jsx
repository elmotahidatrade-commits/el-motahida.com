import { useSite } from '../../context/SiteContext';
import { Phone, Mail } from 'lucide-react';

const Topbar = () => {
  const { settings } = useSite();
  return (
    <div className="h-[36px] bg-[#0a0f1a] w-full flex items-center px-4 md:px-10 text-[11px] md:text-[13px] text-white/75 gap-x-4 md:gap-x-8 z-50 relative">
      <div className="flex items-center gap-x-2">
        <Phone size={12} className="text-white/75" />
        <span className="font-medium tracking-wide">{settings?.phone || '+201068846536'}</span>
      </div>
      <div className="hidden sm:flex items-center gap-x-2 border-l border-white/10 pl-4 md:pl-6">
        <span className="text-[10px] font-bold opacity-60 uppercase">Phone 2</span>
        <span className="font-medium tracking-wide">{settings?.landline || '+201507887486'}</span>
      </div>
      <div className="flex items-center gap-x-2 border-l border-white/10 pl-4 md:pl-6 ml-auto overflow-hidden">
        <Mail size={12} className="text-white/75 shrink-0" />
        <span className="truncate">{settings?.email || 'elmotahidatrade@gmail.com'}</span>
      </div>
    </div>
  );
};

export default Topbar;
