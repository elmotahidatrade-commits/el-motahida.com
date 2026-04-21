import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020814] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://el-motahidacom-production.up.railway.app/uploads/hero-bg-01.jpg" 
          alt="Industrial Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020814] via-[#020814]/80 to-primary/20" />
      </div>

      {/* Decorative Blur Ornaments */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="max-w-md w-full z-10 animate-in fade-in zoom-in-95 duration-700">
        {/* Glassmorphic Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-8 sm:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20 shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <img 
                src="https://el-motahidacom-production.up.railway.app/uploads/site-logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.classList.remove('hidden');
                }}
              />
              <ShieldCheck size={40} className="text-primary hidden" />
            </div>
            <h1 className="text-2xl font-bold text-white font-display tracking-tight">EL-MOTAHIDA TRADE</h1>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] mt-2">Admin Command Center</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest ml-1">Authentication ID</label>
              <div className="relative group/input">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elmotahida.com"
                  className="w-full h-13 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Secret Protocol</label>
              </div>
              <div className="relative group/input">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-13 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 text-sm text-white outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-sm tracking-widest uppercase shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group/btn mt-8"
            >
              {loading ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <>
                  Establish Connection
                  <ShieldCheck size={18} className="group-hover/btn:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-white/20 leading-relaxed font-medium uppercase tracking-[0.1em]">
              &copy; 2026 EL-Motahida Trade Industrial Co.<br/>
              Security Level: Tier 1 Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
