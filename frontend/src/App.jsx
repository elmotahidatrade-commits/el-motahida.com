import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
import QuoteModal from './components/common/QuoteModal';
import { SiteProvider } from './context/SiteContext';

function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen bg-[#0a1a3a] flex items-center justify-center text-white">Loading EMT...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
        <QuoteModal />
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;
