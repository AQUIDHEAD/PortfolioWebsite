import React from 'react';
import { personalInfo } from '../data/portfolioData';
import SkillsMarquee from './SkillsMarquee';

const HomeSection = () => {
  return (
    <section className="h-screen flex items-start justify-center p-6 pt-32 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, <br /> I'm {personalInfo.name}
          </h1>
          <div className="mt-8">
            <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
              {personalInfo.bio}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {/* THE CHANGE IS HERE: Added shadow-2xl and shadow-cyan-400/20 for a glow effect */}
          <img
            src={personalInfo.profilePicture}
            alt={personalInfo.name}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl shadow-cyan-400/20"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/1a1a1a/ffffff?text=EGO'; }}
          />
        </div>

      </div>

      <SkillsMarquee />
    </section>
  );
};

export default HomeSection;