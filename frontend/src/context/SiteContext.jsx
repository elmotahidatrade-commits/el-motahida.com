import React, { createContext, useContext, useEffect, useState } from 'react';

const SiteContext = createContext({});
const API = import.meta.env.VITE_API_URL || 'https://el-motahidacom-production.up.railway.app/api';

export function SiteProvider({ children }) {
  const [images, setImages] = useState({});
  const [settings, setSettings] = useState({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then(data => {
        setImages(Object.fromEntries(Object.entries(data.images || {})));
        setSettings(data);
      })
      .catch((error) => {
          console.warn("Failed to fetch site settings, using local fallbacks.");
          // Fallback map for live test without DB
          setImages({
            'site-logo': '/uploads/site-logo.png',
            'site-logo-light': '/uploads/site-logo.png',
            'hero-bg-01': '/uploads/hero-bg-01.jpg',
            'hero-bg-02': '/uploads/hero-bg-02.jpg',
            'expertise-01-pulp-machinery': '/uploads/expertise-01-pulp-machinery.jpg',
            'product-01-double-disc-refiner': '/uploads/product-01-double-disc-refiner.jpg',
            'trusted-01-turnkey-installations': '/uploads/trusted-01-turnkey-installations.jpg',
            'project-01-paper-mill-mena': '/uploads/project-01-paper-mill-mena.jpg'
          });
      });
  }, []);

  const img = (key, fallback = '') => {
      // Fallback works if the image doesn't exist AND during loading. 
      // The API returns partial paths like `/uploads/1.jpg`, we need the full path to hit backend.
      const val = images[key];
      if (val) {
          if (val.startsWith('http')) return val;
          return `https://el-motahidacom-production.up.railway.app${val}`;
      }
      return fallback;
  }

  return (
    <SiteContext.Provider value={{ images, settings, img, isQuoteModalOpen, setIsQuoteModalOpen }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
