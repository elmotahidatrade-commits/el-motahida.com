import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Layout, Image as ImageIcon, Settings } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import BilangualInput from '../components/ui/BilangualInput';
import ImageUploader from '../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const HeroSlideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    subtitle: '',
    backgroundImage: '',
    badgeText: '',
    order: 0,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(`/hero-slides/${id}`);
          setFormData(data);
        } catch (error) {
          toast.error('Failed to load slide details');
          navigate('/hero-slides');
        } finally {
          setFetching(false);
        }
      };
      fetchData();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.en || !formData.title.ar || !formData.backgroundImage) {
      return toast.error('Please fill in required fields (Titles and Image)');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/hero-slides/${id}`, formData);
        toast.success('Hero slide updated');
      } else {
        await api.post('/hero-slides', formData);
        toast.success('Hero slide created');
      }
      navigate('/hero-slides');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save slide');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Fetching slide data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/hero-slides')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{isEdit ? 'Edit Hero Slide' : 'New Hero Slide'}</h2>
            <p className="text-sm text-textMuted font-medium">Customize banner content for the homepage carousel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/hero-slides')}>Cancel</Button>
          <Button 
            variant="primary" 
            icon={<Save size={18} />} 
            onClick={handleSubmit}
            loading={loading}
          >
            {isEdit ? 'Update Slide' : 'Publish Slide'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Layout size={20} className="text-primary" />
              Banner Content
            </h3>
            
            <BilangualInput 
              label="Main Heading"
              nameEn="title.en"
              nameAr="title.ar"
              valueEn={formData.title.en}
              valueAr={formData.title.ar}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Badge Text (Optional)</label>
                <input
                  type="text"
                  name="badgeText"
                  placeholder="e.g. NEW TECHNOLOGY"
                  value={formData.badgeText}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Display Sequence</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Subheading / Brief Text</label>
              <textarea
                name="subtitle"
                rows={3}
                placeholder="Enter brief description for the slide..."
                value={formData.subtitle}
                onChange={handleChange}
                className="input-field !h-auto py-3"
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <ImageIcon size={20} className="text-primary" />
              Background Image
            </h3>
            <ImageUploader 
              value={formData.backgroundImage} 
              onChange={(url) => setFormData(prev => ({ ...prev, backgroundImage: url }))} 
            />
            <p className="text-[11px] text-textMuted leading-relaxed">
              Recommended size: 1920x1080px. High-quality imagery ensures professional presentation.
            </p>
          </section>

          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Settings size={20} className="text-primary" />
              Slide Status
            </h3>

            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-3 bg-background/50 rounded-xl cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textMain">Public Active</span>
                  <span className="text-[11px] text-textMuted">Visible in homepage rotation</span>
                </div>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-borderC text-primary focus:ring-primary h-6 w-6"
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideForm;
