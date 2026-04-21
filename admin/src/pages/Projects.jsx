import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, Calendar, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'https://el-motahidacom-production.up.railway.app/api';
const API_BASE = API_URL.replace('/api', '');

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/projects/${deleteId}`);
      toast.success('Project deleted successfully');
      setProjects(projects.filter(p => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (val) => (
        <div className="w-12 h-12 bg-background border border-borderC rounded-lg overflow-hidden shrink-0">
          {val && val[0] ? (
            <img src={val[0].startsWith('http') ? val[0] : `${API_BASE}${val[0]}`} className="w-full h-full object-cover" alt="Project" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-textMuted uppercase text-[10px] font-bold">No Img</div>
          )}
        </div>
      )
    },
    {
      key: 'title',
      label: 'Project Details',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-bold text-textMain">{val.en}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[10px] font-bold text-textMuted uppercase">
              <MapPin size={10} /> {row.country}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-textMuted uppercase">
              <Calendar size={10} /> {row.completionYear}
            </span>
          </div>
        </div>
      )
    },
    { 
      key: 'capacity', 
      label: 'Capacity',
      render: (val) => <span className="text-sm font-semibold text-textMain">{val || '-'}</span>
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
            onClick={() => navigate(`/projects/edit/${row._id}`)}
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
          <h2 className="text-2xl font-bold text-textMain">Project Portfolio</h2>
          <p className="text-sm text-textMuted font-medium">Track global industrial installation success stories</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/projects/new')}
        >
          Create Project
        </Button>
      </div>

      <div className="admin-card p-4 sm:p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search projects..."
              className="input-field pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
             <p className="text-xs font-bold text-textMuted uppercase ml-2">
              {filteredProjects.length} Projects Listed
            </p>
          </div>
        </div>

        {/* Table */}
        <Table 
          columns={columns} 
          data={filteredProjects} 
          isLoading={loading} 
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
        title="Delete Project"
        message="Are you sure you want to delete this project? This will remove all project photos and details from the portfolio."
      />
    </div>
  );
};

export default Projects;
