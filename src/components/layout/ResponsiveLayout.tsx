import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
// import MobileNavbar from "./MobileNavbar";
import Footer from "./Footer";

interface ResponsiveLayoutProps {
	children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<div className="flex flex-col min-h-screen">
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

			{/* Footer - Hidden on mobile for dashboard pages */}
			<div
				className={`${
					location.pathname.includes("/dashboard") ? "hidden md:block" : ""
				}`}>
				<Footer />
			</div>

			{/* Mobile Bottom Navigation */}
			{/* <MobileNavbar /> */}
		</div>
	);
};

export default ResponsiveLayout;
