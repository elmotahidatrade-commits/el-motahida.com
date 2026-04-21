import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  User, 
  Settings, 
  Wrench, 
  FileText, 
  Save,
  MessageSquare,
  History
} from 'lucide-react';
import api from '../utils/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const QuoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { data } = await api.get(`/quotes/${id}`);
        setQuote(data);
        setAdminNotes(data.adminNotes || '');
        setStatus(data.status);
      } catch (error) {
        toast.error('Failed to load quote details');
        navigate('/quotes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [id, navigate]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await api.put(`/quotes/${id}`, { status, adminNotes });
      toast.success('Quote request updated');
      setQuote(prev => ({ ...prev, status, adminNotes }));
    } catch (error) {
      toast.error('Failed to update request');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-textMuted font-bold animate-pulse">Loading Lead Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/quotes')}
            className="p-2 hover:bg-white rounded-xl text-textMuted hover:text-textMain transition-all shadow-sm border border-transparent hover:border-borderC"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-textMain">Review Quote Request</h2>
            <p className="text-sm text-textMuted font-medium">Received on {formatDate(quote.createdAt, { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            icon={<Save size={18} />} 
            onClick={handleUpdate}
            loading={updating}
          >
            Update Inquiry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Building2 size={20} className="text-primary" />
              Customer Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Company Name</p>
                <p className="text-base font-bold text-textMain">{quote.companyName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Contact Person</p>
                <div className="flex items-center gap-2 text-textMain font-semibold">
                  <User size={16} className="text-textMuted" />
                  {quote.contactPerson}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Email Address</p>
                <a href={`mailto:${quote.email}`} className="flex items-center gap-2 text-primary font-semibold hover:underline">
                  <Mail size={16} />
                  {quote.email}
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Phone Number</p>
                <a href={`tel:${quote.phone}`} className="flex items-center gap-2 text-textMain font-semibold hover:text-primary transition-colors">
                  <Phone size={16} className="text-textMuted" />
                  {quote.phone}
                </a>
              </div>
            </div>
          </section>

          {/* Machinery Details */}
          <section className="admin-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Wrench size={20} className="text-primary" />
              Inquired Machine & Parts
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Machine Type</p>
                <p className="text-base font-semibold text-textMain">{quote.machineType || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Machine Make</p>
                <p className="text-base font-semibold text-textMain">{quote.machineMake || '-'}</p>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-xl space-y-2 border border-borderC">
              <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Required Components</p>
              <p className="text-sm text-textMain leading-relaxed italic">
                "{quote.partsRequired || 'No specific parts listed.'}"
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Status Update */}
          <section className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-4">
              <Settings size={20} className="text-primary" />
              Inquiry Status
            </h3>
            
            <div className="space-y-2">
              {['new', 'in-review', 'replied', 'closed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all
                    ${status === s 
                      ? 'bg-primary/5 border-primary text-primary font-bold' 
                      : 'bg-white border-borderC text-textMuted hover:border-textMuted'}
                  `}
                >
                  <span className="capitalize">{s}</span>
                  {status === s && <div className="w-2 h-2 bg-primary rounded-full" />}
                </button>
              ))}
            </div>
          </section>

          {/* Admin Notes */}
          <section className="admin-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-textMain flex items-center gap-2 border-b border-borderC pb-2">
              <MessageSquare size={18} className="text-primary" />
              Internal Notes
            </h3>
            <textarea
              className="input-field !h-auto py-3 min-h-[150px] text-xs font-medium leading-relaxed"
              placeholder="Add private notes about this lead (e.g. Price quoted, delivery status)..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </section>

          {/* Audit Log */}
          <div className="px-1 space-y-4">
            <div className="flex items-center gap-2 text-textMuted uppercase text-[10px] font-bold tracking-widest px-2">
                <History size={14} />
                Activity Log
            </div>
            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-borderC pb-2">
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full z-10" />
                <p className="text-[11px] font-bold text-textMain">Inquiry Created</p>
                <p className="text-[10px] text-textMuted">{formatDate(quote.createdAt)}</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-textMuted rounded-full z-10" />
                <p className="text-[11px] font-bold text-textMuted italic">System Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;
