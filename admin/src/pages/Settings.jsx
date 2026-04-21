import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Share2, Search, Info, Plus, X } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import BilangualInput from '../components/ui/BilangualInput';
import toast from 'react-hot-toast';

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: { ar: '', en: '' },
    phone: '',
    landline: '',
    email: '',
    address: { ar: '', en: '' },
    socialLinks: {},
    metaTags: {},
    stats: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data) setFormData(data);
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await api.put('/settings', formData);
      toast.success('Site settings updated');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Syncing Site Configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain">System Settings</h2>
          <p className="text-sm text-textMuted font-medium">Configure global contact details, social links and metadata</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Save size={18} />} 
          onClick={handleUpdate}
          loading={saving}
        >
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Contact Info */}
        <section className="admin-card p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
            <Phone size={20} className="text-primary" />
            General Branding & Contact
          </h3>
          
          <BilangualInput 
            label="Corporate Site Name"
            nameEn="siteName.en"
            nameAr="siteName.ar"
            valueEn={formData.siteName?.en || ''}
            valueAr={formData.siteName?.ar || ''}
            onChange={handleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Mobile Phone</label>
              <div className="relative group">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+201..."
                  className="input-field pl-11"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Landline Number</label>
              <div className="relative group">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="landline"
                  value={formData.landline}
                  onChange={handleChange}
                  placeholder="047..."
                  className="input-field pl-11"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Public Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@elmotahida.com"
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          <BilangualInput 
            label="Physical Address"
            nameEn="address.en"
            nameAr="address.ar"
            valueEn={formData.address?.en || ''}
            valueAr={formData.address?.ar || ''}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </section>

        {/* Social Links */}
        <section className="admin-card p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
            <Share2 size={20} className="text-primary" />
            Social Media Networks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((network) => (
              <div key={network} className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider capitalize">{network} URL</label>
                <input
                  type="text"
                  placeholder={`https://${network}.com/yourprofile`}
                  value={formData.socialLinks?.[network] || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...(prev.socialLinks || {}), [network]: e.target.value }
                  }))}
                  className="input-field"
                />
              </div>
            ))}
          </div>
        </section>

        {/* SEO Meta Tags */}
        <section className="admin-card p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
            <Search size={20} className="text-primary" />
            SEO Global Metadata
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Global Meta Title</label>
              <input
                type="text"
                placeholder="EL-Motahida Trade | Industrial Machinery Solutions"
                value={formData.metaTags?.['title'] || ''}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metaTags: { ...(prev.metaTags || {}), title: e.target.value }
                }))}
                className="input-field"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Global Meta Description</label>
              <textarea
                rows={3}
                placeholder="Providing integrated industrial solutions for the region's paper and pulp industry..."
                value={formData.metaTags?.['description'] || ''}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metaTags: { ...(prev.metaTags || {}), description: e.target.value }
                }))}
                className="input-field !h-auto py-3"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
