import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const OEMSpareParts = () => {
  const { img, galleryItems, API } = useSite();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    machineMake: '',
    machineType: '',
    partsRequired: ''
  });

  const [captcha] = useState({ q: '6 + 7', a: 13 });
  const [userAnswer, setUserAnswer] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(userAnswer) !== captcha.a) {
      setError('Incorrect captcha answer.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to submit request.');

      setSuccess(true);
      setFormData({
        companyName: '', contactPerson: '', email: '', phone: '',
        machineMake: '', machineType: '', partsRequired: ''
      });
      setUserAnswer('');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Use a reliable fallback set if dynamic items are missing
  const displayItems = galleryItems && galleryItems.length > 0 
    ? galleryItems 
    : [
        { num: 1, src: img('gallery-01-casting-unit', "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80"), label: "Casting Unit" },
        { num: 2, src: img('gallery-02-machining-center', "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"), label: "Machining Center" },
        { num: 3, src: img('gallery-03-quality-control', "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80"), label: "Quality Control" },
        { num: 5, src: img('gallery-05-testing-lab', "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80"), label: "Testing Lab" }
      ];

  return (
    <section id="spare-parts">
      {/* SECTION A: OEM Spare Parts Form */}
      <div className="bg-white py-[40px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-[12px] p-[40px] md:p-[48px] flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden shadow-xl">
            
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content (Form) */}
            <div className="flex-1 z-10 w-full">
              <div className="inline-flex items-center gap-x-2 text-[11px] text-white/85 uppercase font-bold tracking-[0.06em] mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/85" />
                OEM SPARE & WEAR PARTS
              </div>
              <h2 className="text-[28px] font-bold text-white leading-[1.2] font-display">
                Need OEM Spare Parts?<br />We've Got You Covered.
              </h2>
              
              {success ? (
                <div className="mt-6 bg-white/10 border border-white/20 p-6 rounded-lg text-center animate-in fade-in zoom-in duration-300">
                  <div className="text-white font-bold text-lg mb-2">Request Sent!</div>
                  <p className="text-white/80 text-sm">Thank you. Our team will contact you shortly with a quote.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-white underline text-sm">Send another request</button>
                </div>
              ) : (
                <>
                  <p className="text-[14px] text-white/75 mt-[12px] mb-[24px] font-sans">
                    Request a quote for our premium machinery spare parts. Genuine parts ensure maximum durability and seamless integration.
                  </p>

                  <form onSubmit={handleSubmit} className="w-full">
                    {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-white text-[12px] rounded-md">{error}</div>}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Company Name *" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      <input required name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" placeholder="Contact Person *" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address *" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number *" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      <input name="machineMake" value={formData.machineMake} onChange={handleChange} type="text" placeholder="Machine Make" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      <input name="machineType" value={formData.machineType} onChange={handleChange} type="text" placeholder="Machine Type" className="bg-white rounded-[6px] h-[42px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50" />
                      
                      <div className="md:col-span-2">
                        <textarea name="partsRequired" value={formData.partsRequired} onChange={handleChange} placeholder="Parts Required (Please specify quantities) *" required rows={4} className="w-full bg-white rounded-[6px] py-[10px] px-[14px] text-[13px] text-[#1a2035] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-white/50 resize-none"></textarea>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                      <div className="flex items-center gap-x-3 bg-white/20 rounded-[6px] px-4 h-[42px]">
                        <span className="text-[12px] text-white font-medium">◎ {captcha.q} = ?</span>
                        <input required value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} type="text" className="w-[40px] bg-white/10 text-white border-b border-white/40 outline-none text-center h-[24px] text-[13px]" />
                      </div>
                      <button disabled={loading} type="submit" className="bg-white text-primary font-bold rounded-[6px] px-[24px] h-[42px] text-[14px] w-full sm:w-auto hover:bg-gray-100 transition-colors flex items-center justify-center gap-x-2 whitespace-nowrap disabled:opacity-70">
                        {loading ? 'Sending...' : 'Request Quote'} 
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Right Content (Illustration placeholder) */}
            <div className="hidden lg:flex flex-col items-center justify-center w-[320px] shrink-0 z-10 relative">
              {/* Floating Badge */}
              <div className="absolute top-10 left-[-20px] bg-white rounded-full px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-x-2 z-20 animate-bounce cursor-default">
                <div className="w-[8px] h-[8px] bg-accent rounded-full" />
                <span className="text-[11px] font-bold text-[#1a2035] tracking-wide">24/7 SERVICE EXCELLENCE</span>
              </div>
              
              <div className="w-[280px] h-[280px] bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-[200px] h-[200px] bg-white/10 rounded-full border border-dashed border-white/30 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                  {/* Mock parts graphic using CSS and Lucide for now */}
                   <div className="w-[120px] h-[120px] border-[16px] border-white/40 rounded-full"></div>
                </div>
              </div>

              <h4 className="text-white font-semibold text-[14px] mt-6 text-center">Fast Availability for shorter Downtime</h4>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION B: Manufacturing Gallery */}
      <div id="manufacturing" className="bg-white py-[50px] px-4 md:px-[5%] w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2 mb-1">
                <BarChart2 className="text-primary w-5 h-5 -rotate-90" />
                <h2 className="text-[24px] font-bold text-[#1a2035] font-display">Our Manufacturing Facility</h2>
              </div>
              <p className="text-[13px] text-text-muted">Take a virtual tour of our state-of-the-art production floors.</p>
            </div>
            
            <div className="flex gap-x-2">
              <button className="w-[32px] h-[32px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button className="w-[32px] h-[32px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Photo Strip */}
          <div className="flex gap-x-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200">
            {displayItems.map((photo) => (
              <div key={photo.num} className="snap-start relative flex-none w-[60%] md:w-[calc(100%/3-8px)] lg:w-[calc(14.28%-10px)] rounded-[8px] overflow-hidden group cursor-pointer">
                
                {/* Number Badge */}
                <div className="absolute top-[6px] left-[6px] w-[20px] h-[20px] bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-sm">
                  {photo.num}
                </div>

                <div className="h-[100px] w-full overflow-hidden">
                  <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                
                <p className="text-[11px] text-[#4a5568] text-center mt-1.5 font-medium group-hover:text-primary transition-colors">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OEMSpareParts;
