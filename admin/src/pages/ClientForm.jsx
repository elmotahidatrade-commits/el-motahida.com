import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Building2, MapPin, Globe, ImageIcon } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import ImageUploader from '../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    country: '',
    region: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(`/clients/${id}`);
          setFormData(data);
        } catch (error) {
          toast.error('Failed to load client details');
          navigate('/clients');
        } finally {
          setFetching(false);
        }
      };
      fetchData();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.logoUrl) {
      return toast.error('Please fill in Company Name and provide a Logo');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/clients/${id}`, formData);
        toast.success('Client profile updated');
      } else {
        await api.post('/clients', formData);
        toast.success('New client added to network');
      }
      navigate('/clients');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save client');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Fetching Client Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/clients')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{isEdit ? 'Update Client' : 'Add New Client'}</h2>
            <p className="text-sm text-textMuted font-medium">Manage corporate branding in the global partner network</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/clients')}>Cancel</Button>
          <Button 
            variant="primary" 
            icon={<Save size={18} />} 
            onClick={handleSubmit}
            loading={loading}
          >
            {isEdit ? 'Save Changes' : 'Confirm & Add'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Building2 size={20} className="text-primary" />
              Company Details
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="e.g. Amazon Industrial"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Country</label>
                  <div className="relative group">
                    <Globe size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      name="country"
                      placeholder="e.g. USA"
                      value={formData.country}
                      onChange={handleChange}
                      className="input-field pl-11"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Global Region</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20fill=%27none%27%20viewBox=%270%200%2020%2020%27%3E%3Cpath%20stroke=%27%236b7280%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%20stroke-width=%271.5%27%20d=%27m6%208%204%204%204-4%27/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select Region</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="USA">USA</option>
                    <option value="Latin America">Latin America</option>
                    <option value="South East Asia">South East Asia</option>
                    <option value="India">India</option>
                    <option value="Russia">Russia</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <ImageIcon size={20} className="text-primary" />
              Company Logo
            </h3>
            <ImageUploader 
              value={formData.logoUrl} 
              onChange={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))} 
            />
            <p className="text-[11px] text-textMuted leading-relaxed italic">
              Logo should have a transparent or white background. SVGs or high-res PNGs are preferred for the client carousel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
