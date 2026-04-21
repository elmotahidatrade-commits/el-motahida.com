import { useSite } from '../../context/SiteContext';
import { Phone, Mail } from 'lucide-react';

const Topbar = () => {
  const { settings } = useSite();
  return (
    <div className="h-[36px] bg-[#0a0f1a] w-full flex items-center px-10 text-[13px] text-white/75 gap-x-8 z-50 relative">
      <div className="flex items-center gap-x-2">
        <Phone size={14} className="text-white/75" />
        <span className="font-medium tracking-wide">{settings?.phone || '+201118964175'}</span>
      </div>
      <div className="flex items-center gap-x-2 border-l border-white/10 pl-6">
        <span className="text-[11px] font-bold opacity-60 uppercase">Landline</span>
        <span className="font-medium tracking-wide">{settings?.landline || '0473861560'}</span>
      </div>
      <div className="flex items-center gap-x-2 border-l border-white/10 pl-6 ml-auto">
        <Mail size={14} className="text-white/75" />
        <span>{settings?.email || 'Hamedsamaha75@gmail.com'}</span>
      </div>
    </div>
  );
};

export default Topbar;
