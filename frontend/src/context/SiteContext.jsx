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
            'agate': '/uploads/agate.jpg',
            '26-agate-pin': '/uploads/26-agate-pin.jpg',
            'cap-felter': '/uploads/cap-felter.jpg',
            'coated-teflon-mould': '/uploads/coated-teflon-mould.jpg',
            'case-felter': '/uploads/case-felter.jpg',
            'circular-knife': '/uploads/circular-knife.jpg',
            'holders-four-holes': '/uploads/holders-four-holes.jpg',
            'palette': '/uploads/palette.jpg',
            'special-plastic-product': '/uploads/special-plastic-product.jpg',
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

    const img = (key, fallback) => {
        if (!key) return fallback;
        
        // 1. Normalize key (convert to lowercase and replace spaces/special chars with hyphens)
        const normalizedKey = key.toLowerCase().trim()
            .replace(/ & /g, '-')
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/g, '');
        
        // 2. Define the exact filename mapping for industrial assets
        const industrialAssets = {
            'agate': 'agate.jpg',
            '26-agate-pin': '26-agate-pin.jpg',
            'cap-felter': 'cap-felter.jpg',
            'coated-teflon-mould': 'coated-teflon-mould.jpg',
            'case-felter': 'case-felter.jpg',
            'circular-knife': 'circular-knife.jpg',
            'holders-four-holes': 'holders-four-holes.jpg',
            'palette': 'palette.jpg',
            'special-plastic-product': 'special-plastic-product.jpg',
            'male-press': 'male-press.jpg',
            'fine-industrial-pin': 'fine-industrial-pin.jpg',
            'mould': 'mould.jpg',
            'retainer': 'retainer.jpg',
            'felter-press-cap': 'felter-press-cap.jpg',
            'explore-01-technical-papers': 'explore-01-technical-papers.jpg',
            'explore-02-case-studies': 'explore-02-case-studies.jpg',
            'explore-03-sustainability': 'explore-03-sustainability.jpg',
            'explore-04-career-opportunities': 'explore-04-career-opportunities.jpg',
            'hero-bg-01': 'hero-bg-01.jpg',
            'hero-bg-02': 'hero-bg-02.jpg',
            'site-logo': 'site-logo.png',
            'about-us-hero': 'industrial-facility-premium.png',
            'site-video': 'intro.mp4'
        };

        // 3. Match against our local industrial assets map
        if (industrialAssets[normalizedKey]) {
            return `/uploads/${industrialAssets[normalizedKey]}`;
        }

        // 4. Fallback to DB images if available
        if (images && images[key]) {
            const val = images[key];
            if (val.startsWith('http')) return val;
            const base = 'https://el-motahidacom-production.up.railway.app';
            return `${base}${val}`;
        }

        return fallback;
    };

  return (
    <SiteContext.Provider value={{ images, settings, img, isQuoteModalOpen, setIsQuoteModalOpen, spareParts, galleryItems, API }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
