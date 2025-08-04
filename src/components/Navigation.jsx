import React from 'react';

const Navigation = ({ sections, activeSection, onDotClick }) => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 h-full z-30 flex items-center pr-4 md:pr-8">
      <div className="flex flex-col space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="relative group flex items-center">
            
            {/* THE CHANGE IS HERE: Updated background and text color for the tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1 bg-gray-900/70 backdrop-blur-sm text-cyan-400 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {section.name}
            </div>

            <button
              onClick={() => onDotClick(index)}
              className={`w-4 h-4 transition-all duration-300 ease-in-out transform rotate-45 ${
                activeSection === index
                  ? 'bg-white scale-125'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;