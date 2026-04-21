import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ExternalLink, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const API_BASE = 'https://el-motahidacom-production.up.railway.app';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/products/${deleteId}`);
      toast.success('Product deleted successfully');
      setProducts(products.filter(p => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (val) => (
        <div className="w-12 h-12 bg-background border border-borderC rounded-lg overflow-hidden shrink-0">
          {val && val[0] ? (
            <img src={val[0].startsWith('http') ? val[0] : `${API_BASE}${val[0]}`} className="w-full h-full object-cover" alt="Product" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-textMuted uppercase text-[10px] font-bold">No Img</div>
          )}
        </div>
      )
    },
    {
      key: 'title',
      label: 'Product Name',
      sortable: true,
      render: (val) => (
        <div>
          <p className="font-bold text-textMain">{val?.en || 'Untitled Product'}</p>
          <p className="text-[11px] text-textMuted font-display" dir="rtl">{val?.ar}</p>
        </div>
      )
    },
    { 
      key: 'category', 
      label: 'Category', 
      sortable: true,
      render: (val) => <span className="text-xs font-bold text-textMuted bg-background px-2 py-1 rounded uppercase tracking-wider">{val}</span>
    },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (val) => val ? <Badge variant="amber">Featured</Badge> : <span className="text-textMuted text-xs">-</span>
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (val) => <Badge variant={val ? 'green' : 'red'}>{val ? 'Active' : 'Inactive'}</Badge>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/products/edit/${row._id}`)}
            className="p-2 text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => setDeleteId(row._id)}
            className="p-2 text-textMuted hover:text-danger hover:bg-danger/5 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
          <a
            href={`http://localhost:5173/products/${row.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-textMuted hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="View on Website"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain">Inventory</h2>
          <p className="text-sm text-textMuted font-medium">Manage and monitor your industrial product catalog</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/products/new')}
        >
          Add New Product
        </Button>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="input-field pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" icon={<Filter size={16} />}>Filters</Button>
            <p className="text-xs font-bold text-textMuted uppercase ml-2 hidden sm:block">
              {filteredProducts.length} Products Found
            </p>
          </div>
        </div>

        {/* Table */}
        <Table 
          columns={columns} 
          data={filteredProducts} 
          isLoading={loading} 
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
        title="Delete Product"
        message="Are you sure you want to delete this product? This will remove all associated images and specifications from the system."
      />
    </div>
  );
};

export default Products;
