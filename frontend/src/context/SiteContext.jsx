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
            'Agate': '/uploads/Agate.jpg',
            '26 agate & Pin': '/uploads/26 agate & Pin.jpg',
            'Cap Felter': '/uploads/Cap Felter.jpg',
            'Coated Teflon Mould': '/uploads/Coated Teflon Mould.jpg',
            'Case Felter': '/uploads/Case Felter.jpg',
            'Circular Knife': '/uploads/Circular Knife.jpg',
            'Holders Four Holes': '/uploads/Holders Four Holes.jpg',
            'palette': '/uploads/palette.jpg',
            'special Plastic Product': '/uploads/special Plastic Product.jpg',
            'explore-01-technical-papers': '/uploads/explore-01-technical-papers.jpg',
            'explore-02-case-studies': '/uploads/explore-02-case-studies.jpg'
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
