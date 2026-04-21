import React, { useState, useEffect } from 'react';
import { 
  Package, 
  FolderKanban, 
  FileText, 
  Users, 
  PlusCircle, 
  ArrowRight, 
  Settings, 
  Image as ImageIcon, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    newQuotes: 0,
    clients: 0
  });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [productsRes, projectsRes, quotesRes, clientsRes] = await Promise.all([
          api.get('/products'),
          api.get('/projects'),
          api.get('/quotes'),
          api.get('/clients')
        ]);

        setStats({
          products: Array.isArray(productsRes.data) ? productsRes.data.length : productsRes.data.total || 0,
          projects: projectsRes.data?.length || 0,
          newQuotes: quotesRes.data?.filter(q => q.status === 'new').length || 0,
          clients: clientsRes.data?.length || 0
        });

        const sortedQuotes = [...(quotesRes.data || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentQuotes(sortedQuotes.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quoteColumns = [
    { 
      key: 'companyName', 
      label: 'Company',
      render: (val, row) => (
        <div className="flex flex-col">
          <p className="font-bold text-textMain">{val}</p>
          <p className="text-[11px] text-textMuted font-medium uppercase tracking-wider">{row.contactPerson}</p>
        </div>
      )
    },
    { 
      key: 'machineType', 
      label: 'Request Type',
      render: (val) => (
        <span className="text-xs font-bold text-textMain px-2.5 py-1 bg-primary/5 rounded-full border border-primary/10">
            {val}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Timestamp',
      render: (val) => <span className="text-[12px] font-medium text-textMuted">{formatDate(val)}</span>
    },
    { 
      key: 'status', 
      label: 'Phase',
      render: (val) => (
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{val}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <Link 
          to={`/quotes/${row._id}`}
          className="w-10 h-10 hover:bg-primary hover:text-white text-primary rounded-xl transition-all flex items-center justify-center border border-borderC hover:border-primary shadow-sm hover:shadow-primary/20"
        >
          <ArrowRight size={18} />
        </Link>
      )
    }
  ];

  const quickLinks = [
    { label: 'Add New Product', path: '/products/new', icon: Package, color: 'bg-primary/10 text-primary' },
    { label: 'Create Project', path: '/projects/new', icon: FolderKanban, color: 'bg-navy-dark/10 text-navy-dark' },
    { label: 'Global Branding', path: '/settings', icon: Settings, color: 'bg-amber-100 text-amber-700' },
    { label: 'Media Manager', path: '/images', icon: ImageIcon, color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Header */}
      <div className="bg-navy-dark rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-navy-dark/20 border border-white/5">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome Back, {user?.name?.split(' ')[0] || 'Admin'}</h2>
                <p className="text-white/60 mt-2 font-medium flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary" />
                    Security Clearance: <span className="text-white font-bold uppercase tracking-widest text-[11px]">{user?.role || 'SUPERADMIN'}</span>
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Live Connection</p>
                    <p className="text-sm font-bold text-primary">Regional Node: Cairo-01</p>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
                    <RefreshCw size={20} className="text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </div>
            </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          icon={Package} 
          label="Catalog Items" 
          value={loading ? '...' : stats.products} 
          color="blue" 
          linkTo="/products"
        />
        <StatCard 
          icon={FolderKanban} 
          label="Industrial Projects" 
          value={loading ? '...' : stats.projects} 
          color="navy" 
          linkTo="/projects"
        />
        <StatCard 
          icon={FileText} 
          label="Pending Quotes" 
          value={loading ? '...' : stats.newQuotes} 
          color="green" 
          linkTo="/quotes"
        />
        <StatCard 
          icon={Users} 
          label="Corporate Clients" 
          value={loading ? '...' : stats.clients} 
          color="amber" 
          linkTo="/clients"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Quotes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Recent Inquiries
            </h3>
            <Link to="/quotes" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
               View Registry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="admin-card">
            <Table 
              columns={quoteColumns} 
              data={recentQuotes} 
              isLoading={loading} 
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
            <PlusCircle size={20} className="text-primary" />
            Protocol Shortcuts
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {quickLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="admin-card p-5 flex items-center justify-between group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${link.color} flex items-center justify-center transition-all duration-500 group-hover:rotate-12`}>
                    <link.icon size={22} />
                  </div>
                  <span className="text-[13px] font-bold text-textMain uppercase tracking-wide">{link.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-borderC flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary">
                    <ArrowRight size={14} className="text-textMuted group-hover:text-primary transition-all group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Maintenance Card */}
          <div className="admin-card p-6 bg-gradient-to-br from-navy to-navy-dark text-white border-white/5 shadow-2xl shadow-navy-dark/40 relative overflow-hidden mt-6">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50" />
            <h4 className="text-base font-bold relative z-10 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                System Intelligence
            </h4>
            <p className="text-white/60 text-[11px] mt-2 relative z-10 leading-relaxed font-medium">
              Autonomous monitoring active. All industrial data streams are synchronized with regional EMT nodes.
            </p>
            <div className="mt-5 flex items-center justify-between relative z-10">
                <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Operational</div>
                <ShieldCheck size={18} className="text-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
