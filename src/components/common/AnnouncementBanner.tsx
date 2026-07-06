import React from "react";

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-center px-4 py-2 text-xs md:text-sm font-medium">
      🚀 <strong>Private Preview</strong> • Alum Connect is currently in
      development and has not been officially launched. All statistics,
      counters, user counts, engagement metrics, and platform data displayed on
      this website are demonstration values for testing and preview purposes
      only and do not represent real platform activity.
    </div>
  );
};

export default AnnouncementBanner;
