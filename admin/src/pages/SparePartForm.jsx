import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Wrench, Settings, Search, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import ImageUploader from '../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const SparePartForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    partName: '',
    machineType: '',
    machineMake: '',
    description: '',
    partNumber: '',
    images: [],
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(`/spare-parts/${id}`);
          setFormData(data);
        } catch (error) {
          toast.error('Failed to load part details');
          navigate('/spare-parts');
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
    if (!formData.partName || !formData.machineType || !formData.machineMake) {
      return toast.error('Please fill in required fields');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/spare-parts/${id}`, formData);
        toast.success('Spare part updated');
      } else {
        await api.post('/spare-parts', formData);
        toast.success('Spare part added to inventory');
      }
      navigate('/spare-parts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save part');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Syncing Inventory Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/spare-parts')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{isEdit ? 'Edit Spare Part' : 'Add Spare Part'}</h2>
            <p className="text-sm text-textMuted font-medium">{isEdit ? 'Modify technical details for existing part' : 'Register a new OEM part in the catalog'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/spare-parts')}>Cancel</Button>
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
              <Wrench size={20} className="text-primary" />
              Technical Properties
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Part Name</label>
                  <input
                    type="text"
                    name="partName"
                    placeholder="e.g. Bronze Screen Mesh"
                    value={formData.partName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Part / Ref Number</label>
                  <input
                    type="text"
                    name="partNumber"
                    placeholder="e.g. EM-1029-X"
                    value={formData.partNumber}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Machine Type</label>
                  <input
                    type="text"
                    name="machineType"
                    placeholder="e.g. Double Disc Refiner"
                    value={formData.machineType}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Manufacturer / Make</label>
                  <input
                    type="text"
                    name="machineMake"
                    placeholder="e.g. Valmet / Voith"
                    value={formData.machineMake}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Description (Optional)</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Additional details about compatibility or material..."
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field !h-auto py-3"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <ImageIcon size={20} className="text-primary" />
              Part Images
            </h3>
            <ImageUploader 
              multiple 
              value={formData.images} 
              onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))} 
            />
          </section>

          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Settings size={20} className="text-primary" />
              Availability
            </h3>

            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-3 bg-background/50 rounded-xl cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textMain">In Catalog</span>
                  <span className="text-[11px] text-textMuted">Visible for quote requests</span>
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

export default SparePartForm;
