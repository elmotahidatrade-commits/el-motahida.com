import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('em_admin_token');
    const storedUser = localStorage.getItem('em_admin_user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth Restore Error:', error);
        localStorage.removeItem('em_admin_token');
        localStorage.removeItem('em_admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      const { token, ...userData } = data;
      localStorage.setItem('em_admin_token', token);
      localStorage.setItem('em_admin_user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('em_admin_token');
    localStorage.removeItem('em_admin_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, login, logout, isAuthenticated };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
