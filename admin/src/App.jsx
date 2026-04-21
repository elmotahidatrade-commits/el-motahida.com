import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import SpareParts from './pages/SpareParts';
import SparePartForm from './pages/SparePartForm';
import HeroSlides from './pages/HeroSlides';
import HeroSlideForm from './pages/HeroSlideForm';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';
import Clients from './pages/Clients';
import ClientForm from './pages/ClientForm';
import Settings from './pages/Settings';
import ImageManager from './pages/ImageManager';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            
            {/* Projects */}
            <Route path="projects" element={<Projects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />

            {/* Spare Parts */}
            <Route path="spare-parts" element={<SpareParts />} />
            <Route path="spare-parts/new" element={<SparePartForm />} />
            <Route path="spare-parts/edit/:id" element={<SparePartForm />} />

            {/* Hero Slides */}
            <Route path="hero-slides" element={<HeroSlides />} />
            <Route path="hero-slides/new" element={<HeroSlideForm />} />
            <Route path="hero-slides/edit/:id" element={<HeroSlideForm />} />

            {/* Quotes */}
            <Route path="quotes" element={<Quotes />} />
            <Route path="quotes/:id" element={<QuoteDetail />} />

            {/* Clients */}
            <Route path="clients" element={<Clients />} />
            <Route path="clients/new" element={<ClientForm />} />
            <Route path="clients/edit/:id" element={<ClientForm />} />

            {/* Settings */}
            <Route path="settings" element={<Settings />} />
            
            {/* Images */}
            <Route path="images" element={<ImageManager />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
