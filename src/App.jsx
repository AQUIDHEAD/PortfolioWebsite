import React, { useState, useRef, useEffect } from 'react';

import HomeSection from './components/HomeSection';
import ProjectSection from './components/ProjectSection';
import Navigation from './components/Navigation';
import TerminalIntro from './components/TerminalIntro';
import BackgroundGlow from './components/BackgroundGlow'; // <-- Import the new component
import { projects } from './data/portfolioData';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const scrollContainerRef = useRef(null);
  const isScrolling = useRef(false);
  const sectionNames = [
    { name: 'About me' },
    ...projects.map(p => ({ name: p.name }))
  ];

  const scrollToSection = (index) => {
    const container = scrollContainerRef.current;
    if (!container || isScrolling.current) return;
    if (index === activeSection) return;

    isScrolling.current = true;
    setActiveSection(index);

    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    if (introComplete) {
      const container = scrollContainerRef.current;
      if (!container) return;

      const handleWheel = (event) => {
        const scrollDown = event.deltaY > 0;
        if (scrollDown) {
          if (activeSection < sectionNames.length - 1) {
            scrollToSection(activeSection + 1);
          }
        } else {
          if (activeSection > 0) {
            scrollToSection(activeSection - 1);
          }
        }
      };
      
      container.addEventListener('wheel', handleWheel);
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [introComplete, activeSection, sectionNames.length]);

  if (!introComplete) {
    return <TerminalIntro onSequenceComplete={() => setIntroComplete(true)} />;
  }

  return (
    <>
      <BackgroundGlow /> {/* <-- The glow is added here */}

      <Navigation 
        sections={sectionNames}
        activeSection={activeSection}
        onDotClick={scrollToSection}
      />

      <main
        ref={scrollContainerRef}
        className="text-white font-sans h-screen w-screen overflow-hidden"
      >
        <div className="h-screen w-screen"><HomeSection /></div>
        
        {projects.map((project, index) => (
          <div key={project.name} className="h-screen w-screen">
            <ProjectSection 
              project={project} 
              isFirst={index === 0}
              isLast={index === projects.length - 1} 
            />
          </div>
        ))}
      </main>
    </>
  );
}

export default App;