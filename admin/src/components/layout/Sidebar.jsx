import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderKanban, 
  Wrench, 
  Image as ImageIcon, 
  FileText, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Monitor
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: Wrench, label: 'Spare Parts', path: '/spare-parts' },
  { icon: ImageIcon, label: 'Hero Slides', path: '/hero-slides' },
  { icon: Monitor, label: 'Image Manager', path: '/images' },
  { icon: FileText, label: 'Quote Requests', path: '/quotes', badge: 'new' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: Settings, label: 'Site Settings', path: '/settings' },
];

const Sidebar = ({ isOpen, setOpen, mobileOpen, setMobileOpen }) => {
  const { pathname } = useLocation();

  const NavItem = ({ icon: Icon, label, path, badge }) => (
    <NavLink
      to={path}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3.5 transition-all relative group
        ${isActive 
          ? 'bg-primary/10 text-primary border-l-4 border-primary' 
          : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}
      `}
    >
      <Icon size={20} className="shrink-0" />
      <span className={`text-sm font-semibold transition-opacity duration-300 ${!isOpen ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
        {label}
      </span>
      {!isOpen && (
        <div className="absolute left-16 bg-navy-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </NavLink>
  );

  const API_URL = import.meta.env.VITE_API_URL || 'https://el-motahidacom-production.up.railway.app/api';
  const BASE_URL = API_URL.replace('/api', '');

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-navy-dark flex flex-col transition-all duration-300
          ${isOpen ? 'w-[240px]' : 'w-[240px] lg:w-16'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-4 border-b border-white/5">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
             <img 
               src={`${BASE_URL}/uploads/site-logo.png`}
               className="w-7 h-7 object-contain"
               alt="EMT"
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.nextSibling.style.display = 'block';
               }}
             />
             <span className="hidden text-white font-bold text-xl">E</span>
          </div>
          <div className={`ml-3 flex flex-col transition-opacity duration-300 ${!isOpen ? 'lg:opacity-0' : 'opacity-100'}`}>
            <span className="text-white font-display font-bold text-[16px] tracking-tight leading-none">
              EL-MOTAHIDA
            </span>
            <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mt-1 opacity-80">
              CMD CENTER
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Collapse Button (Desktop) */}
        <button 
          onClick={() => setOpen(!isOpen)}
          className="hidden lg:flex h-16 items-center px-6 border-t border-white/5 text-white/40 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          <span className={`ml-3 text-xs font-bold uppercase tracking-widest transition-opacity ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Collapse Nav
          </span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
