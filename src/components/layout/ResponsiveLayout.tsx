import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanner from "../common/AnnouncementBanner";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pre-Launch Banner */}
      <AnnouncementBanner />

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar transparent={isHomePage} />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <Navbar transparent={false} />
      </div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <div
        className={`${
          location.pathname.includes("/dashboard")
            ? "hidden md:block"
            : ""
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default ResponsiveLayout;
