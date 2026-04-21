import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Wrench, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const API_BASE = 'https://el-motahidacom-production.up.railway.app';

const SpareParts = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/spare-parts');
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch spare parts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/spare-parts/${deleteId}`);
      toast.success('Spare part removed');
      setItems(items.filter(i => i._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter(i => 
    i.partName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.machineType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.partNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'images',
      label: 'Part Photo',
      render: (val) => (
        <div className="w-12 h-12 bg-background border border-borderC rounded-lg overflow-hidden shrink-0">
          {val && val[0] ? (
            <img src={val[0].startsWith('http') ? val[0] : `${API_BASE}${val[0]}`} className="w-full h-full object-cover" alt="Part" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-textMuted p-1">
                <Wrench size={16} />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'partName',
      label: 'Part Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-bold text-textMain">{val}</p>
          <p className="text-[10px] font-bold text-primary uppercase tracking-tight">#{row.partNumber || 'NO-REF'}</p>
        </div>
      )
    },
    { key: 'machineType', label: 'Machine Type' },
    { 
      key: 'machineMake', 
      label: 'OEM Make',
      render: (val) => <span className="text-xs font-bold text-textMuted bg-background px-2 py-1 rounded uppercase">{val}</span>
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (val) => <Badge variant={val ? 'green' : 'red'}>{val ? 'In Stock' : 'Disallowed'}</Badge>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/spare-parts/edit/${row._id}`)}
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
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain">Spare Parts Inventory</h2>
          <p className="text-sm text-textMuted font-medium">Manage parts availability for OEM machinery services</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/spare-parts/new')}
        >
          Add New Part
        </Button>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by part name or number..."
              className="input-field pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
             <p className="text-xs font-bold text-textMuted uppercase ml-2">
              {filteredItems.length} Parts available
            </p>
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredItems} 
          isLoading={loading} 
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
        title="Remove Spare Part"
        message="Are you sure you want to remove this part from the inventory list?"
      />
    </div>
  );
};

export default SpareParts;
