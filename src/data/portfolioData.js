// src/data/portfolioData.js

// You can find a placeholder image here: https://placehold.co/
// Or use a real image from your `src/assets` folder
import profilePic from '../assets/profile-placeholder.png'; 

export const personalInfo = {
  name: "Eduardo Guasti Ortiz",
  bio: "A Computer Science student and dedicated web developer focused on creating impactful digital experiences. I specialize in front-end development, ensuring both functionality and aesthetic appeal. With a strong background in Python, JavaScript, and React, I'm adept at building innovative solutions, including AI-integrated and data-driven applications.",
  profilePicture: profilePic,
};

export const skills = [
  'Java', 'Python', 'C/C++', 'JavaScript', 'HTML/CSS', 
  'Git', 'Docker', 'VS Code', 'Kubernetes', 'Google Cloud', 'Google Gemini AI', 'React', 'React Native', 'APIs',
  'Windows', 'LINUX', 'Mac', 'iOS', 'Android',
  'Microsoft Python Certification', 'CIW HTML CSS Certification', 'IBM DevOps Certificate',
  'English', 'Spanish',
  'Word', 'Excel', 'PowerPoint'
];

export const projects = [
  {
    name: "NourishLens",
    type: "mobile", // Based on React Native and "app" description
    description: "Developing an AI-powered nutrition tracker app enabling automatic meal logging via image recognition. Utilizes Google Gemini AI, Google Cloud, and Firebase for authentication and database management. Built with React Native and Expo, integrating Fast Secret and USDA Database APIs for comprehensive nutritional data. Set to release around Fall 2025",
    technologies: [
      "Google Cloud",
      "Google Gemini AI",
      "React Native",
      "Expo",
      "APIs",
      "Fast Secret API",
      "USDA Database API",
      "Firebase",
      "Authentication",
      "Database"
    ],
    repoUrl: null , // Link to your GitHub repo
    liveUrl: null , // Link to the live site
    videoSrc: "https://res.cloudinary.com/dhoa8zcl1/video/upload/v1754315055/NourishLensVideo_n8bp9v.mov" // Replace with your project video
  },
  {
    name: "Personal Website",
    type: "laptop", // 'laptop' or 'mobile' - confirmed as laptop for a portfolio website
    description: "Designed and developed a responsive personal portfolio website to showcase project work and technical skills. Built with React and styled using Tailwind CSS, deployed seamlessly on Vercel.",
    technologies: [
      "Vercel",
      "React",
      "Tailwind CSS"
    ],
    repoUrl: "https://github.com/AQUIDHEAD/PortfolioWebsite",
    liveUrl: "https://portfolio-website-delta-khaki.vercel.app/", // Set to null if no live site
    videoSrc: "https://res.cloudinary.com/dhoa8zcl1/video/upload/v1754315316/PersonalWebsiteVideo_bn6zft.mp4" 
  },
  {
    name: "Running and Walking Tracker Web App",
    type: "mobile", // The app is a web app, and while it's mobile-friendly, "laptop" for web apps is a common convention in these schemas.
    description: "Built a real-time running and walking tracker web app. The application integrates Firebase for user authentication and data management, enabling local leaderboards and fostering community engagement.",
    technologies: [
      "Vercel",
      "React",
      "Firebase (Authentication, Database)"
    ],
    repoUrl: "https://gitlab.com/EGO1508/runner_walker_app_v1.git",
    liveUrl: "https://runnerwalkerappv1.vercel.app/",
    videoSrc: "https://res.cloudinary.com/dhoa8zcl1/video/upload/v1754311831/RunnerWalkerAppMobile_kuitpz.mp4"
  },
  {
    name: "WhatsApp Memory Viewer",
    type: "laptop", // Assuming this is a web application accessible via a browser, so 'laptop' is appropriate. If it's a mobile-specific app (e.g., native), then 'mobile' would be better.
    description: "Developed a web application that provides a WhatsApp-like user interface to elegantly view past chat logs.",
    technologies: [
      "React"
    ],
    repoUrl: "https://github.com/AQUIDHEAD/message-viewer-whatsapp",
    liveUrl: null,
    videoSrc: "https://res.cloudinary.com/dhoa8zcl1/video/upload/v1754311828/WhatsappViewerApp_bhplf1.mp4"
  }
];

export const socialLinks = {
  github: "https://github.com/AQUIDHEAD",
  gitlab: "https://gitlab.com/EGO1508",
  linkedin: "https://www.linkedin.com/in/eduardo-guasti-ortiz/",
  email: "mailto:eguasti21@gmail.com",
  resume: "/resume.pdf" // Make sure to add your resume to the `public` folder
};