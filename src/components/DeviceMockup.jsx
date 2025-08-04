import React from 'react';

const DeviceMockup = ({ type, videoSrc }) => {
  // --- Laptop Mockup ---
  if (type === 'laptop') {
    return (
      <div className="relative w-full max-w-2xl mx-auto rounded-t-lg bg-gray-800 p-2 shadow-2xl shadow-black">
        <div className="w-full h-8 bg-gray-700 rounded-t-md flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-black w-full aspect-video">
          <video className="w-full h-full object-cover" src={videoSrc} autoPlay loop muted playsInline></video>
        </div>
      </div>
    );
  }

  // --- Mobile Mockup ---
  if (type === 'mobile') {
    // THE CHANGE IS HERE: max-w-xs is now max-w-[16rem] to make the phone smaller
    return (
      <div className="relative w-full max-w-[16rem] mx-auto aspect-[9/19.5] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-black border-4 border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-10"></div>
        <div className="bg-black w-full h-full rounded-[2rem] overflow-hidden">
          <video className="w-full h-full object-cover" src={videoSrc} autoPlay loop muted playsInline></video>
        </div>
      </div>
    );
  }

  return null;
};

export default DeviceMockup;