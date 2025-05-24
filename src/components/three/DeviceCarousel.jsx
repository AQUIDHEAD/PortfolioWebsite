// src/components/layout/three/DeviceCarousel.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import Laptop from './Laptop';
import Phone from './Phone';

const MOBILE_BREAKPOINT = 768; // pixels

const DeviceCarousel = ({ currentProject, isVisible }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = currentProject?.videoSrc || '';
  const projectTitle = currentProject?.title || 'Project';
  const projectLink = currentProject?.repoLink || currentProject?.liveLink || "#";

  const isLaptopActive = !!(isVisible && currentProject?.type === 'website');
  const isPhoneActive = !!(isVisible && currentProject?.type !== 'website' && currentProject?.type);

  if (!currentProject) {
    return (
      <div className="w-full h-full flex items-center justify-center text-portfolio-white p-4">
        <p>No project selected.</p>
      </div>
    );
  }

  const baseCameraTargetY = -0.2;

  // Responsive camera settings
  const cameraPosition = useMemo(() => {
    if (isLaptopActive && isMobileView) {
      return [0, baseCameraTargetY + 0.15, 3.8]; // Laptop on Mobile: Pull camera back further, slightly higher
    }
    // Default / Desktop / Phone view
    return [0, baseCameraTargetY + 0.3, 2.8];
  }, [isLaptopActive, isMobileView, baseCameraTargetY]);

  const cameraFov = useMemo(() => {
    if (isLaptopActive && isMobileView) {
      return 69; // Laptop on Mobile: Wider FOV to "zoom out"
    }
    // Default / Desktop / Phone view
    return 50;
  }, [isLaptopActive, isMobileView]);


  // Define scales
  const laptopScale = 6.5;
  const phoneScale = 0.03;

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          key={isMobileView ? 'mobile-cam' : 'desktop-cam'} // Force re-creation on view change if needed
          position={cameraPosition}
          fov={cameraFov}
        />

        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight
          color="#fff7e8"
          intensity={1.8}
          position={[-4, 5, 4]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
            color="#e8f0ff"
            intensity={0.5}
            position={[4, 3, -3]}
        />

        {/* Add OrbitControls for testing if needed */}
        {/* <OrbitControls target={[0, baseCameraTargetY, 0]} /> */}


        {currentProject?.type === 'website' ? (
          <Laptop
            position={[0, -0.4, 0]} // This position is relative to the world origin
            scale={laptopScale}
            videoSrc={videoSrc}
            active={isLaptopActive}
            projectTitle={projectTitle}
            projectLink={projectLink}
          />
        ) : (
          <Phone
            position={[0, -0.1, 0]} // This position is relative to the world origin
            scale={phoneScale}
            videoSrc={videoSrc}
            active={isPhoneActive}
            projectTitle={projectTitle}
            projectLink={projectLink}
          />
        )}
      </Canvas>
    </div>
  );
};

export default DeviceCarousel;
