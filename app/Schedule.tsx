import React from 'react';

export default function SchedulePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://cal.com/uttaran-nayak-alchemyst/30min?overlayCalendar=true&layout=mobile"
        className="w-full h-full border-none"
        allow="camera; microphone; autoplay; encrypted-media;"
      />
    </div>
  );
}