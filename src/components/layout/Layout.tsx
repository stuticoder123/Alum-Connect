import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBanner from "./AnnouncementBanner";

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <Navbar transparent={isHomePage} />
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
</div>
  );
};

export default Layout;
