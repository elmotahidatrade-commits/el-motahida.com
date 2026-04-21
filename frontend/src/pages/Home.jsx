import React from 'react';
import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import OneStopPartner from '../components/home/OneStopPartner';
import StatsBar from '../components/home/StatsBar';
import TrustedPartner from '../components/home/TrustedPartner';
import TurnkeyProjects from '../components/home/TurnkeyProjects';
import ProductFinder from '../components/home/ProductFinder';
import Expertise from '../components/home/Expertise';
import OEMSpareParts from '../components/home/OEMSpareParts';
import ExploreMore from '../components/home/ExploreMore';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <OneStopPartner />
        <StatsBar />
        <TrustedPartner />
        <TurnkeyProjects />
        <ProductFinder />
        <Expertise />
        <OEMSpareParts />
        <ExploreMore />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
