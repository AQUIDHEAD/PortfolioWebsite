// src/components/layout/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub, FaGitlab, FaEnvelope, FaTwitter, FaMedium } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/eduardo-guasti-ortiz/',
    icon: <FaLinkedin />,
    ariaLabel: 'View LinkedIn profile', 
  },
  {
    name: 'GitHub',
    url: 'https://github.com/AQUIDHEAD',
    icon: <FaGithub />,
    ariaLabel: 'View GitHub profile',
  },
  {
    name: 'GitLab',
    url: 'https://gitlab.com/EGO1508  ',
    icon: <FaGitlab />,
    ariaLabel: 'View GitLab profile',
  },
  {
    name: 'Email',
    url: 'mailto:eguasti21@gmail.com',
    icon: <FaEnvelope />,
    ariaLabel: 'Send an email',
  },
  // Add more links as needed:
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/yourusername',
  //   icon: <FaTwitter />,
  //   ariaLabel: 'View Twitter profile',
  // },
  // {
  //   name: 'Medium',
  //   url: 'https://medium.com/@yourusername',
  //   icon: <FaMedium />,
  //   ariaLabel: 'Read articles on Medium',
  // },
  // {
  //   name: 'LeetCode',
  //   url: 'https://leetcode.com/yourusername/',
  //   icon: <SiLeetcode />,
  //   ariaLabel: 'View LeetCode profile',
  // }
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 sm:p-6 bg-cursed-black bg-opacity-70 backdrop-blur-sm text-center z-10 border-t border-mint-green border-opacity-20">
      <div className="flex justify-center items-center space-x-5 sm:space-x-8 mb-3 sm:mb-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel || `Link to ${link.name}`}
            className="text-mint-green hover:text-portfolio-white transition-colors duration-300 text-2xl sm:text-3xl transform hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-portfolio-white opacity-70">
        &copy; {currentYear} Eduardo Guasti Ortiz. All rights reserved.
      </p>
      <p className="text-xs text-portfolio-white opacity-50 mt-1">
        Crafted with React, Vercel, Three.js & Tailwind CSS
      </p>
    </footer>
  );
}

export default Footer;
