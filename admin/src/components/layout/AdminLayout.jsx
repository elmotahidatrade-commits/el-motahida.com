import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1a2035',
            fontWeight: '600',
            fontSize: '14px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
        }}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        setOpen={setSidebarOpen} 
        mobileOpen={mobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header setMobileOpen={setMobileSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto w-full max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
