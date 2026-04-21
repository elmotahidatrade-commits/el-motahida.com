import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ImageIcon, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const API_BASE = 'https://el-motahidacom-production.up.railway.app';

const HeroSlides = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/hero-slides');
      setSlides(data);
    } catch (error) {
      toast.error('Failed to fetch slides');
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
      await api.delete(`/hero-slides/${deleteId}`);
      toast.success('Slide removed');
      setSlides(slides.filter(s => s._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to remove slide');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      key: 'order',
      label: '#',
      render: (val) => <span className="font-bold text-textMuted">#{val}</span>
    },
    {
      key: 'backgroundImage',
      label: 'Preview',
      render: (val) => (
        <div className="w-20 h-12 bg-background border border-borderC rounded-lg overflow-hidden shrink-0">
          {val ? (
            <img src={val.startsWith('http') ? val : `${API_BASE}${val}`} className="w-full h-full object-cover" alt="Hero" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-textMuted">
                <ImageIcon size={16} />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'title',
      label: 'Slide Title',
      render: (val) => (
        <div>
          <p className="font-bold text-textMain">{val?.en || 'Untitled Slide'}</p>
          <p className="text-[11px] text-textMuted font-display leading-tight" dir="rtl">{val?.ar}</p>
        </div>
      )
    },
    { 
      key: 'badgeText', 
      label: 'Badge',
      render: (val) => val ? <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-bold uppercase">{val}</span> : '-'
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (val) => <Badge variant={val ? 'green' : 'red'}>{val ? 'Visible' : 'Hidden'}</Badge>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/hero-slides/edit/${row._id}`)}
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
          <h2 className="text-2xl font-bold text-textMain">Hero Carousel</h2>
          <p className="text-sm text-textMuted font-medium">Configure the main scrolling slides for the website homepage</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/hero-slides/new')}
        >
          New Hero Slide
        </Button>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        <div className="flex items-center gap-2 mb-2">
            <Layers size={18} className="text-primary" />
            <h3 className="text-base font-bold text-textMain">Active Slides</h3>
        </div>
        
        <Table 
          columns={columns} 
          data={slides} 
          isLoading={loading} 
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
        title="Remove Slide"
        message="Are you sure you want to delete this hero slide? This will remove it from the homepage carousel immediately."
      />
    </div>
  );
};

export default HeroSlides;
