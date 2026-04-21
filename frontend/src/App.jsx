import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuoteModal from './components/common/QuoteModal';
import { SiteProvider } from './context/SiteContext';

function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <QuoteModal />
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;
