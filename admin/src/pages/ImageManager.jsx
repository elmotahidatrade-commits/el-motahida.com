import React, { useState, useEffect } from 'react';
import { ImageIcon, Monitor, Upload, RefreshCw, Layers, CheckCircle2, Layout, HelpCircle } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'https://el-motahidacom-production.up.railway.app/api';
const API_BASE = API_URL.replace('/api', '');

const ImageManager = () => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Hero');
  const [uploadingKey, setUploadingKey] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await api.get('/settings');
        setImages(data.images || {});
      } catch (error) {
        toast.error('Failed to load image registry');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const groups = {
    'Branding': ['site-logo', 'site-logo-light', 'site-video'],
    'Hero Highlights': ['hero-bg-01', 'hero-bg-02', 'onestop-hero'],
    'Gallery & Shop': ['gallery-01-casting-unit', 'gallery-02-machining-center', 'gallery-03-quality-control', 'gallery-04-assembly-line', 'gallery-05-testing-lab', 'gallery-06-shipping', 'gallery-07-rd-facility'],
    'Expertise Sections': ['expertise-01-pulp-machinery', 'expertise-02-paper-machine-solutions', 'expertise-03-molded-fiber-tech', 'expertise-04-refining-systems', 'expertise-05-agitators-screens'],
    'Featured Products': ['product-01-double-disc-refiner', 'product-02-pressure-screen', 'product-03-high-density-cleaner', 'product-04-pulper-automation'],
    'Trusted Partner': ['trusted-01-turnkey-installations', 'trusted-02-custom-heavy-machinery', 'trusted-03-modernization-upgrades', 'trusted-04-automation-control', 'trusted-05-preventative-maintenance', 'trusted-06-global-spares-delivery'],
    'Projects': ['project-01-paper-mill-mena', 'project-02', 'project-03', 'project-04', 'project-05', 'project-06', 'project-07', 'project-08'],
    'Asset Library': ['extra-01', 'extra-02', 'extra-03', 'extra-04', 'extra-05', 'extra-06', 'extra-07', 'extra-08', 'extra-09', 'extra-10']
  };

  const handleUpload = async (key, file) => {
    if (!file) return;
    setUploadingKey(key);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Upload file to backend
      const { data: uploadData } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 2. Update site settings map
      await api.patch(`/settings/images/${key}`, { url: uploadData.url });

      setImages(prev => ({ ...prev, [key]: uploadData.url }));
      toast.success('Image slot updated successfully');
    } catch (error) {
      toast.error('Failed to update image');
    } finally {
      setUploadingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Scanning Website Image Slots...</p>
      </div>
    );
  }

  const currentSlotKeys = groups[activeTab] || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain">Website Image Manager</h2>
          <p className="text-sm text-textMuted font-medium">Dynamically replace any image on the main website without code changes</p>
        </div>
        <div className="bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Live Sync Active</span>
        </div>
      </div>

      {/* Group Selector */}
      <div className="flex flex-wrap gap-2 pb-2">
        {Object.keys(groups).map(group => (
          <button
            key={group}
            onClick={() => setActiveTab(group)}
            className={`
              px-5 py-2.5 rounded-full text-xs font-bold transition-all border-2
              ${activeTab === group 
                ? 'bg-primary border-primary text-white shadow-lg' 
                : 'bg-white border-borderC text-textMuted hover:border-textMuted'}
            `}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentSlotKeys.map(key => {
          const url = images[key];
          const fullUrl = url ? (url.startsWith('http') ? url : `${API_BASE}${url}`) : '';
          const isUploading = uploadingKey === key;

          return (
            <div key={key} className="admin-card group hover:border-primary/40 transition-all flex flex-col h-full">
              {/* Image Preview Overlay */}
              <div className="relative aspect-video bg-background overflow-hidden border-b border-borderC">
                {url ? (
                  url.toLowerCase().endsWith('.mp4') ? (
                    <video src={fullUrl} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={fullUrl} className="w-full h-full object-cover" alt={key} />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-textMuted p-6 text-center">
                    <ImageIcon size={32} className="mb-2 opacity-30" />
                    <span className="text-[10px] font-bold uppercase">No Asset Assigned</span>
                  </div>
                )}
                
                {/* Upload Overlay */}
                <label className={`
                  absolute inset-0 bg-navy-dark/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer
                  ${isUploading ? 'opacity-100' : ''}
                `}>
                  {isUploading ? (
                    <RefreshCw size={24} className="text-white animate-spin" />
                  ) : (
                    <>
                      <Upload size={24} className="text-white mb-2" />
                      <span className="text-white text-[11px] font-bold uppercase">Replace Asset</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*,video/mp4"
                    onChange={(e) => handleUpload(key, e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Detail */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                   <h4 className="text-[11px] font-bold text-textMuted uppercase tracking-widest mb-1">IMAGE SLOT ID</h4>
                   <p className="text-sm font-bold text-textMain break-all">{key}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-borderC flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-accent">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-bold uppercase">Deployed</span>
                    </div>
                    <button className="text-textMuted hover:text-primary transition-colors">
                        <HelpCircle size={16} />
                    </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tip */}
      <div className="bg-navy-dark text-white p-6 rounded-2xl shadow-xl flex items-start gap-4 relative overflow-hidden mt-8">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="p-3 bg-white/10 rounded-xl">
            <Layers size={24} className="text-primary" />
        </div>
        <div>
            <h4 className="text-base font-bold">Pro Tip: Component Synchronization</h4>
            <p className="text-white/70 text-xs mt-1 leading-relaxed max-w-2xl">
                Changes made here reflect instantly on the public website. Our CDN-less architecture ensures that the machinery photos you upload are served directly from the industrial cluster node for maximum performance.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
