import React, { useState } from 'react';
import { X, Send, Settings, User, Mail, Building2, Phone } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const API = 'http://localhost:5000/api';

const QuoteModal = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen } = useSite();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    machineType: 'General Inquiry',
    message: ''
  });

  if (!isQuoteModalOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quote request.');
      }

      setSuccess(true);
      setTimeout(() => {
        setIsQuoteModalOpen(false);
        setSuccess(false);
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          machineType: 'General Inquiry',
          message: ''
        });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050f1e]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsQuoteModalOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-navy-dark text-white p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-2xl font-bold font-display">Request a Quote</h2>
              <p className="text-white/70 text-sm mt-1">Provide your details and we'll get back to you with custom pricing.</p>
            </div>
            <button 
              onClick={() => setIsQuoteModalOpen(false)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-12 text-center flex flex-col items-center justify-center h-[400px]">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Send size={32} />
             </div>
             <h3 className="text-2xl font-bold text-textMain mb-2">Request Sent Successfully!</h3>
             <p className="text-textMuted max-w-md mx-auto">Our engineering team has received your inquiry and will contact you shortly with more details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Company Name *</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-[13px] text-textMuted" />
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-borderC rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Enter company name" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Contact Person *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-[13px] text-textMuted" />
                  <input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full border border-borderC rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Full name" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-[13px] text-textMuted" />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-borderC rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="work@company.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-[13px] text-textMuted" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-borderC rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="+1..." />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Interested In *</label>
              <div className="relative">
                <Settings size={16} className="absolute left-3.5 top-[13px] text-textMuted" />
                <select required name="machineType" value={formData.machineType} onChange={handleChange} className="w-full border border-borderC rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white appearance-none">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Turnkey Project">Complete Turnkey Project</option>
                  <option value="Double Disc Refiner">Double Disc Refiner</option>
                  <option value="Pressure Screen">Pressure Screen</option>
                  <option value="Pulper System">Pulper System</option>
                  <option value="Spare Parts">Spare Parts</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">Additional Details</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                className="w-full border border-borderC rounded-lg p-3.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                placeholder="Tell us about your production capacity, material specs, or any specific requirements..."
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsQuoteModalOpen(false)}
                className="px-6 py-2.5 rounded-lg border border-borderC font-semibold text-textMuted hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-[#0d47a1] text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                     Submit Inquiry <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
