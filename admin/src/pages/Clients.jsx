import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Globe, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const API_BASE = 'https://el-motahidacom-production.up.railway.app';

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/clients');
      setClients(data);
    } catch (error) {
      toast.error('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/clients/${deleteId}`);
      toast.success('Client removed');
      setClients(clients.filter(c => c._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to remove client');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredClients = clients.filter(c => 
    c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'logoUrl',
      label: 'Logo',
      render: (val) => (
        <div className="w-16 h-10 bg-white border border-borderC rounded-lg overflow-hidden flex items-center justify-center p-1.5 shadow-sm">
          {val ? (
            <img src={val.startsWith('http') ? val : `${API_BASE}${val}`} className="max-w-full max-h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" alt="Client" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-textMuted bg-background">
                <Building2 size={16} />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'companyName',
      label: 'Company Name',
      sortable: true,
      render: (val) => <span className="font-bold text-textMain">{val}</span>
    },
    { 
      key: 'country', 
      label: 'Country',
      render: (val) => (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-textMuted">
          <Globe size={14} className="text-primary/50" />
          {val || 'N/A'}
        </div>
      )
    },
    { 
      key: 'region', 
      label: 'Region',
      render: (val) => <span className="text-xs font-bold text-textMuted bg-background px-2 py-1 rounded uppercase tracking-wider">{val || 'International'}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/clients/edit/${row._id}`)}
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
          <h2 className="text-2xl font-bold text-textMain">Client Portfolio</h2>
          <p className="text-sm text-textMuted font-medium">Manage corporate partners and global client network</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/clients/new')}
        >
          Add Client Logo
        </Button>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search clients..."
              className="input-field pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-xs font-bold text-textMuted uppercase">
              {filteredClients.length} Listed Partners
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredClients} 
          isLoading={loading} 
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
        title="Remove Client"
        message="Are you sure you want to remove this client from the network list?"
      />
    </div>
  );
};

export default Clients;
