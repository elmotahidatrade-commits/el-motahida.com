import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Globe, MapPin, Calendar, Layout, Image as ImageIcon, Briefcase } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import BilangualInput from '../components/ui/BilangualInput';
import ImageUploader from '../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    description: { ar: '', en: '' },
    capacity: '',
    location: '',
    country: '',
    completionYear: new Date().getFullYear(),
    images: [],
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const { data } = await api.get(`/projects/${id}`);
          setFormData(data);
        } catch (error) {
          toast.error('Failed to load project details');
          navigate('/projects');
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
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
    if (!formData.title.en || !formData.title.ar || !formData.country) {
      return toast.error('Please fill in required fields (Titles and Country)');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, formData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', formData);
        toast.success('Project created successfully');
      }
      navigate('/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Loading Project Info...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/projects')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{isEdit ? 'Update Project' : 'New Project Story'}</h2>
            <p className="text-sm text-textMuted font-medium">{isEdit ? 'Modify project details and machinery setup' : 'Showcase a new successful installation'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/projects')}>Cancel</Button>
          <Button 
            variant="primary" 
            icon={<Save size={18} />} 
            onClick={handleSubmit}
            loading={loading}
          >
            {isEdit ? 'Update Record' : 'Publish Project'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Briefcase size={20} className="text-primary" />
              Project Basics
            </h3>
            
            <BilangualInput 
              label="Project Reference / Customer Name"
              nameEn="title.en"
              nameAr="title.ar"
              valueEn={formData.title.en}
              valueAr={formData.title.ar}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Production Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  placeholder="e.g. 100 TPD Board Machine"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Completion Year</label>
                <input
                  type="number"
                  name="completionYear"
                  value={formData.completionYear}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <BilangualInput 
              label="Project Scope / Description"
              nameEn="description.en"
              nameAr="description.ar"
              valueEn={formData.description.en}
              valueAr={formData.description.ar}
              onChange={handleChange}
              multiline
              required
            />
          </section>

          {/* Location Info */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <MapPin size={20} className="text-primary" />
              Installation Site
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Country</label>
                <div className="relative group">
                  <Globe size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="country"
                    placeholder="e.g. Egypt"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">City / Location</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. 10th of Ramadan City"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field pl-11"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Images */}
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <ImageIcon size={20} className="text-primary" />
              Project Photos
            </h3>
            <ImageUploader 
              multiple 
              value={formData.images} 
              onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))} 
            />
          </section>

          {/* Settings */}
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Layout size={20} className="text-primary" />
              Settings
            </h3>

            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-3 bg-background/50 rounded-xl cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textMain">Active Project</span>
                  <span className="text-[11px] text-textMuted">Visible in website portfolio</span>
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

export default ProjectForm;
