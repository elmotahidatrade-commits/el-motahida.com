import React from 'react';
import { Menu, LogOut, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Header = ({ setMobileOpen }) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  // Map pathname to Page Title
  const getPageTitle = (path) => {
    const titles = {
      '/dashboard': 'Dashboard Overview',
      '/products': 'Product Management',
      '/projects': 'Project Portfolio',
      '/spare-parts': 'Spare Parts Inventory',
      '/hero-slides': 'Homepage Hero Slides',
      '/quotes': 'Quote Requests',
      '/clients': 'Client Partners',
      '/settings': 'System Settings',
      '/images': 'Website Image Manager',
    };
    return titles[path] || 'Admin Panel';
  };

  return (
    <header className="h-20 bg-white border-b border-borderC px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 hover:bg-background rounded-lg text-textMain transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-bold text-textMain hidden sm:block">
          {getPageTitle(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        {/* Search - Hidden on Small Mobile */}
        <div className="hidden md:flex items-center relative group">
          <Search size={18} className="absolute left-3 text-textMuted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-10 pr-4 py-2 bg-background/50 border border-transparent rounded-full text-sm outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 w-64 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 border-l border-borderC pl-2 sm:pl-6">
          <button className="p-2 text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-textMain leading-none">{user?.name || 'Admin User'}</p>
              <p className="text-[11px] font-bold text-textMuted uppercase tracking-wider mt-1">{user?.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary overflow-hidden shadow-inner">
               <User size={22} />
            </div>
          </div>

          <button 
            onClick={logout}
            className="p-2 text-textMuted hover:text-danger hover:bg-danger/5 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
