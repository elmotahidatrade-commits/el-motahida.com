import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Plus, X, List, Layout, Info, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import BilangualInput from '../components/ui/BilangualInput';
import ImageUploader from '../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    description: { ar: '', en: '' },
    category: '',
    subcategory: '',
    images: [],
    specs: {},
    isFeatured: false,
    isActive: true,
  });

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          setFormData(data);
        } catch (error) {
          toast.error('Failed to load product details');
          navigate('/products');
        } finally {
          setFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested fields (title.en, description.ar etc)
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

  const handleSpecAdd = () => {
    if (!specKey || !specValue) return toast.error('Please enter both key and value');
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [specKey]: specValue }
    }));
    setSpecKey('');
    setSpecValue('');
  };

  const handleSpecRemove = (key) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.en || !formData.title.ar || !formData.category) {
      return toast.error('Please fill in required fields (Titles and Category)');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, formData);
        toast.success('Product updated successfully');
      } else {
        // Generate slug from title en if not provided (backend usually handles this but good to have)
        const slug = formData.title.en.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        await api.post('/products', { ...formData, slug });
        toast.success('Product created successfully');
      }
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Fetching Product Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/products')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{isEdit ? 'Edit Product' : 'New Product'}</h2>
            <p className="text-sm text-textMuted font-medium">{isEdit ? 'Update existing product information' : 'Fill in details to add a new machine'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/products')}>Cancel</Button>
          <Button 
            variant="primary" 
            icon={<Save size={18} />} 
            onClick={handleSubmit}
            loading={loading}
          >
            {isEdit ? 'Update Product' : 'Save Product'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Layout size={20} className="text-primary" />
              General Information
            </h3>
            
            <BilangualInput 
              label="Product Title"
              nameEn="title.en"
              nameAr="title.ar"
              valueEn={formData.title.en}
              valueAr={formData.title.ar}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20fill=%27none%27%20viewBox=%270%200%2020%2020%27%3E%3Cpath%20stroke=%27%236b7280%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%20stroke-width=%271.5%27%20d=%27m6%208%204%204%204-4%27/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="">Select Category</option>
                  <option value="Pulp Machinery">Pulp Machinery</option>
                  <option value="Paper Machine">Paper Machine</option>
                  <option value="Packaging Solutions">Packaging Solutions</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">Subcategory (Optional)</label>
                <input
                  type="text"
                  name="subcategory"
                  placeholder="e.g. D-Type Pulper"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <BilangualInput 
              label="Description"
              nameEn="description.en"
              nameAr="description.ar"
              valueEn={formData.description.en}
              valueAr={formData.description.ar}
              onChange={handleChange}
              multiline
              required
            />
          </section>

          {/* Technical Specs */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <List size={20} className="text-primary" />
              Technical Specifications
            </h3>
            
            <div className="flex gap-4 items-end bg-background/50 p-4 rounded-xl border border-borderC">
              <div className="flex-1 space-y-1.5">
                <label className="text-[10px] font-bold text-textMuted uppercase">Property</label>
                <input
                  type="text"
                  placeholder="e.g. Capacity"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className="input-field h-10"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[10px] font-bold text-textMuted uppercase">Value</label>
                <input
                  type="text"
                  placeholder="e.g. 50-200 TPD"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className="input-field h-10"
                />
              </div>
              <Button 
                variant="secondary" 
                onClick={handleSpecAdd}
                className="h-10 px-3"
              >
                <Plus size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(formData.specs || {}).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-white border border-borderC rounded-lg group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-textMuted uppercase">{key}</span>
                    <span className="text-sm font-semibold text-textMain">{val}</span>
                  </div>
                  <button 
                    onClick={() => handleSpecRemove(key)}
                    className="p-1.5 text-danger opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-md"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {Object.keys(formData.specs || {}).length === 0 && (
                <div className="md:col-span-2 py-8 text-center border-2 border-dashed border-borderC rounded-xl">
                  <p className="text-textMuted text-sm italic">No specifications added yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Images */}
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <ImageIcon size={20} className="text-primary" />
              Media Gallery
            </h3>
            <ImageUploader 
              multiple 
              value={formData.images} 
              onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))} 
            />
          </section>

          {/* Visibility Settings */}
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Settings size={20} className="text-primary" />
              Settings
            </h3>

            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-3 bg-background/50 rounded-xl cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textMain">Featured Product</span>
                  <span className="text-[11px] text-textMuted">Prioritize in homepage listings</span>
                </div>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-borderC text-primary focus:ring-primary h-6 w-6"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-background/50 rounded-xl cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-textMain">Public Active</span>
                  <span className="text-[11px] text-textMuted">Visible to website visitors</span>
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

          {/* Tips Card */}
          <div className="bg-navy-dark text-white p-6 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 text-primary">
              <Info size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">SEO Best Practice</span>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              Ensure English titles are descriptive for URL generation. Use high-resolution machinery photos (1200x800px recommended) for the best website appearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
