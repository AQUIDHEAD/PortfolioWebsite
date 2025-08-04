import React from 'react';
import { skills } from '../data/portfolioData';

const SkillsMarquee = () => {
  // Automatically split the skills array into two chunks
  const middleIndex = Math.ceil(skills.length / 2);
  const skillsRow1 = skills.slice(0, middleIndex);
  const skillsRow2 = skills.slice(middleIndex);

  // A reusable component for each scrolling row
  const MarqueeRow = ({ skills, duration = '90s', reverse = false }) => {
    // To ensure there is no empty space, we duplicate the array multiple times
    // creating a very long, seamless loop.
    const extendedSkills = [...skills, ...skills, ...skills, ...skills];
    const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';

    return (
      <div className="relative flex items-center mb-4 overflow-hidden">
        {/* The scrolling content */}
        <div className={`flex ${animationClass}`} style={{ animationDuration: duration }}>
          {extendedSkills.map((skill, index) => (
            <span key={index} className="mx-6 text-lg text-gray-400 whitespace-nowrap">{skill}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* This style tag contains the CSS animations for the marquee */}
      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); } /* Animate to -50% because we doubled the content */
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }

          @keyframes marquee-reverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0%); }
          }
          .animate-marquee-reverse {
            animation: marquee-reverse linear infinite;
          }
        `}
      </style>
      
      {/* THE CHANGE IS HERE: "bottom-0" is now "bottom-10" */}
      <div className="absolute bottom-10 left-0 w-full py-6">
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <MarqueeRow skills={skillsRow1} duration="100s" />
        <MarqueeRow skills={skillsRow2} duration="120s" reverse={true} />
      </div>
    </>
  );
};

export default SkillsMarquee;