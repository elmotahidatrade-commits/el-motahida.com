import { useSite } from '../../context/SiteContext';
import { Globe, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { settings, img } = useSite();
  const address = settings?.address?.en || 'Industrial Area, Cairo, Egypt';
  const phone = settings?.phone || '+201068846536';
  const landline = settings?.landline || '+201507887486';
  const email = settings?.email || 'elmotahidatrade@gmail.com';

  return (
    <footer className="bg-navy-deep text-white/70 py-[60px] px-4 md:px-[5%] w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand & Desc */}
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2 text-white mb-4">
            <img 
              src={img('site-logo', null)} 
              alt="EL-MOTAHIDA" 
              className="h-8 w-auto object-contain brightness-0 invert"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-x-2">
              <Globe className="text-primary w-6 h-6" />
              <span className="font-display font-bold text-xl tracking-tight">EL-MOTAHIDA</span>
            </div>
          </div>
          <p className="text-[13px] leading-[1.6] mb-4">
            El-Motahida Trade Company | Industrial Manufacturing & Work Equipment. We provide high-quality industrial products, tools, and professional work equipment.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-[16px] font-bold text-white mb-4 font-display">Quick Links</h4>
          <ul className="text-[13px] space-y-3">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Career Opportunities</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">News & Events</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Global Network</a></li>
          </ul>
        </div>

        {/* Products */}
        <div className="flex flex-col">
          <h4 className="text-[16px] font-bold text-white mb-4 font-display">Products</h4>
          <ul className="text-[13px] space-y-3">
            <li><a href="#" className="hover:text-primary transition-colors">Turnkey Projects</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">OEM Spare Parts</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Heavy Machinery</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Automation Systems</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h4 className="text-[16px] font-bold text-white mb-4 font-display">Contact Us</h4>
          <ul className="text-[13px] space-y-4">
            <li className="flex items-start gap-x-3">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-y-1">
                <span>{phone}</span>
                <span className="text-[11px] opacity-60">Phone 2: {landline}</span>
              </div>
            </li>
            <li className="flex items-center gap-x-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>{email}</span>
            </li>
            <li className="flex items-start gap-x-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[12px]">
        <p>&copy; {new Date().getFullYear()} EL-MOTAHIDA TRADE. All Rights Reserved.</p>
        <div className="flex gap-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
