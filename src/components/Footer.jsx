import React from 'react';
// THE CHANGE IS HERE: Imported the Gitlab icon
import { Github, Gitlab, Linkedin, Mail, FileText } from 'lucide-react'; 
import { socialLinks } from '../data/portfolioData';

const Footer = () => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-4 flex justify-center items-center space-x-6 md:space-x-8">
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors" aria-label="GitHub">
          <Github size={24} />
          <span className="hidden md:inline">GitHub</span>
        </a>

        {/* THE CHANGE IS HERE: Added the new GitLab link and icon */}
        <a href={socialLinks.gitlab} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors" aria-label="GitLab">
          <Gitlab size={24} />
          <span className="hidden md:inline">GitLab</span>
        </a>

        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
          <Linkedin size={24} />
          <span className="hidden md:inline">LinkedIn</span>
        </a>
        <a href={socialLinks.email} className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors" aria-label="Email">
          <Mail size={24} />
          <span className="hidden md:inline">Email</span>
        </a>
        <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors" aria-label="Resume">
          <FileText size={24} />
          <span className="hidden md:inline">Resume</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;