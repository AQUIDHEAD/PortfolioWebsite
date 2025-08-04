import React from 'react';

const BackgroundGlow = () => {
  return (
    <>
      {/* This style tag defines the slow, pulsing animation */}
      <style>
        {`
          @keyframes shifting-glow-top-left {
            0% {
              transform: scale(1);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 0.4;
            }
          }
        `}
      </style>
      
      {/* This div is the visual glow effect, now positioned in the top-left */}
      <div
        className="fixed top-0 left-0 w-[80vw] h-[80vh] pointer-events-none -z-10"
        style={{
          // A radial gradient now creates the soft glow from the top-left corner
          background: 'radial-gradient(circle at 0% 0%, hsla(185, 100%, 50%, 0.45) 0%, transparent 50%)',
          // The animation is updated to the new keyframes
          animation: 'shifting-glow-top-left 10s ease-in-out infinite',
        }}
      ></div>
    </>
  );
};

export default BackgroundGlow;