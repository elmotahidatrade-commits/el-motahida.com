import React, { useState, useEffect } from 'react';
import { Search, FileText, ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const Quotes = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/quotes');
      setQuotes(data);
    } catch (error) {
      toast.error('Failed to fetch quote requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const columns = [
    { 
      key: 'companyName', 
      label: 'Company / Lead',
      render: (val, row) => (
        <div>
          <p className="font-bold text-textMain">{val}</p>
          <p className="text-[11px] text-textMuted">{row.contactPerson} • {row.phone}</p>
        </div>
      )
    },
    { key: 'machineType', label: 'Machine Type' },
    { 
      key: 'createdAt', 
      label: 'Received',
      render: (val) => (
        <span className="text-xs font-medium text-textMuted">{formatDate(val)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => <Badge>{val}</Badge>
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <button 
          onClick={() => navigate(`/quotes/${row._id}`)}
          className="p-2 hover:bg-primary/5 text-primary rounded-lg transition-colors flex items-center justify-center"
        >
          <ArrowRight size={18} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain">Quote Requests</h2>
          <p className="text-sm text-textMuted font-medium">Review and respond to industrial machinery spare part inquiries</p>
        </div>
        <div className="flex bg-white border border-borderC rounded-lg p-1.5 shadow-sm">
          {['all', 'new', 'in-review', 'replied'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`
                px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all
                ${statusFilter === s ? 'bg-primary text-white shadow-sm' : 'text-textMuted hover:text-textMain'}
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-borderC pb-6">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by company or name..."
              className="input-field pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-xs font-bold text-textMuted uppercase">
            Showing {filteredQuotes.length} requests
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredQuotes} 
          isLoading={loading} 
        />
      </div>
    </div>
  );
};

export default Quotes;
