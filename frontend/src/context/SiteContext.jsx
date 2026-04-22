import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

const SiteContext = createContext({});

const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  return import.meta.env.VITE_API_URL || 'https://el-motahidacom-production.up.railway.app/api';
};

export const API = getApiUrl();

export function SiteProvider({ children }) {
  const [images, setImages] = useState({});
  const [settings, setSettings] = useState({});
  const [spareParts, setSpareParts] = useState([]);
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

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const r = await fetch(`${API}/spare-parts`);
        const data = await r.json();
        setSpareParts(data);
      } catch (error) {
        console.error('Failed to fetch spare parts', error);
      }
    };
    fetchParts();
  }, []);

  // Filter to show only active parts with images
  const galleryItems = useMemo(() => {
    if (!spareParts || spareParts.length === 0) return [];
    return spareParts.map((part, index) => ({
      num: index + 1,
      src: part.images[0]?.startsWith('http') ? part.images[0] : `${API.replace('/api', '')}${part.images[0]}`,
      label: part.partName
    }));
  }, [spareParts]);

  const img = useCallback((key, fallback = '') => {
      const val = images[key];
      if (val) {
          if (val.startsWith('http')) return val;
          const base = API.replace('/api', '');
          return `${base}${val}`;
      }
      return fallback;
  }, [images]);

  return (
    <SiteContext.Provider value={{ images, settings, img, isQuoteModalOpen, setIsQuoteModalOpen, spareParts, galleryItems, API }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
