import React from 'react';
import DeviceMockup from './DeviceMockup';
import Footer from './Footer';

const ProjectSection = ({ project, isFirst, isLast }) => {
  // THE CHANGE IS HERE: Added pt-20 and pb-10 for vertical padding
  return (
    <section className="h-screen flex flex-col items-center justify-center p-6 pr-20 pt-20 pb-10 relative">
      
      {isFirst && (
        <h2 className="text-5xl md:text-6xl font-bold mb-8"> {/* Reduced bottom margin slightly */}
          Projects
        </h2>
      )}

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <DeviceMockup type={project.type} videoSrc={project.videoSrc} />
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-bold mb-4">{project.name}</h3>
          <div className="bg-cyan-950/20 backdrop-blur-sm border border-cyan-400/30 p-6 rounded-2xl">
            <p className="text-gray-300 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
              {project.technologies.map(tech => (
                <span key={tech} className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
              ))}
            </div>
            <div className="flex space-x-4 justify-center lg:justify-start">
              {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white font-medium transition-colors">Repo Link</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white font-medium transition-colors">Live Site</a>}
            </div>
          </div>
        </div>
      </div>

      {isLast && <Footer />}
    </section>
  );
};

export default ProjectSection;