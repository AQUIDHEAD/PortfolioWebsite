// src/App.jsx
import React, { useState, useEffect } from 'react';
import Terminal from './components/terminal/Terminal';
import DeviceCarousel from './components/three/DeviceCarousel';
import Footer from './components/layout/Footer';
import './index.css'; // Main Tailwind styles

// --- Project Data ---
const projectsData = [
  {
    id: 1,
    title: "A WhatsApp Message Viewer",
    videoSrc: "/videos/WhatsappViewerApp.mp4",
    type: 'website',
    repoLink: "https://github.com/AQUIDHEAD/message-viewer-whatsapp",
  },
  {
    id: 2,
    title: "Task Manager Mobile App",
    videoSrc: "/videos/RunnerWalkerAppMobile.mp4",
    type: 'mobile_web_app',
    description: "An App to track your running and walking.",
    techStack: ["React", "Firebase", "Expo"],
    repoLink: "https://gitlab.com/EGO1508/runner_walker_app_v1",
  },
];

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalFadingOut, setTerminalFadingOut] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projectsData[currentProjectIndex];

  const handleTerminalSequenceComplete = () => {
    setTerminalFadingOut(true);
    setTimeout(() => {
      setShowTerminal(false);
      setShowMainContent(true);
    }, 700);
  };

  const goToNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const goToPreviousProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!showMainContent) return;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') goToNextProject();
      else if (event.key === 'ArrowLeft') goToPreviousProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMainContent]);

  return (
    <div className="w-screen h-screen relative bg-cursed-black font-mono flex flex-col overflow-hidden">
      {showTerminal && (
        <div className={terminalFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'}>
          <Terminal onSequenceComplete={handleTerminalSequenceComplete} />
        </div>
      )}

      {showMainContent && (
        <div
          id="main-content-wrapper"
          className="w-full h-full flex flex-col animate-fadeIn flex-grow"
        >
          {/* Header: Your Name - Made Responsive */}
          <header
            className="absolute top-2 left-2 md:top-4 md:left-4 z-20 p-1 md:p-2 bg-cursed-black bg-opacity-50 backdrop-blur-sm rounded-md max-w-[calc(100%-130px)] sm:max-w-[calc(100%-180px)]"
          >
            <h1
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-portfolio-white truncate"
            >
              Eduardo Guasti Ortiz
            </h1>
          </header>

          {/* Project Navigation Buttons - Responsive Positioning */}
          <div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-2 p-2 bg-cursed-black bg-opacity-50 backdrop-blur-sm rounded-lg
                       md:absolute md:top-4 md:right-4 md:bottom-auto md:left-auto md:transform-none"
          >
            <button
              onClick={goToPreviousProject}
              className="px-3 py-1.5 text-sm text-mint-green border border-mint-green rounded-md hover:bg-mint-green hover:text-cursed-black transition-colors duration-200"
              aria-label="Previous Project"
            >
              &lt; Prev
            </button>
            <button
              onClick={goToNextProject}
              className="px-3 py-1.5 text-sm text-mint-green border border-mint-green rounded-md hover:bg-mint-green hover:text-cursed-black transition-colors duration-200"
              aria-label="Next Project"
            >
              Next &gt;
            </button>
          </div>

          <main className="flex-grow relative min-h-0 flex items-center justify-center w-full pb-16 md:pb-0">
            <DeviceCarousel
              currentProject={currentProject}
              isVisible={showMainContent}
            />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

