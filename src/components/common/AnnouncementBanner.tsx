import React from "react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-center py-2 px-4 text-xs md:text-sm font-medium">
      <strong>Private Preview</strong> • Alum Connect is currently in development and has not been officially launched.
      All statistics, counters, user counts, and platform metrics displayed are demonstration data for testing purposes only.
    </div>
  );
};

export default AnnouncementBanner;
