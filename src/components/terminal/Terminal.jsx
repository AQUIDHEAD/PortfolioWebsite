// src/components/layout/terminal/Terminal.jsx
import React, { useState, useEffect } from 'react';

const WELCOME_COMMAND = './initialize-portfolio.sh';
const TYPING_SPEED_MS = 80;
const POST_COMMAND_DELAY_MS = 750;

function Terminal({ onSequenceComplete }) {
  const [typedCommand, setTypedCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [commandFullyTyped, setCommandFullyTyped] = useState(false);

  useEffect(() => {
    if (typedCommand.length < WELCOME_COMMAND.length) {
      const timeoutId = setTimeout(() => {
        setTypedCommand(WELCOME_COMMAND.substring(0, typedCommand.length + 1));
      }, TYPING_SPEED_MS);
      return () => clearTimeout(timeoutId);
    } else {
      setCommandFullyTyped(true);
      setShowCursor(false);
    }
  }, [typedCommand]);

  useEffect(() => {
    if (commandFullyTyped) {
      const timeoutId = setTimeout(() => {
        onSequenceComplete();
      }, POST_COMMAND_DELAY_MS);
      return () => clearTimeout(timeoutId);
    }
  }, [commandFullyTyped, onSequenceComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cursed-black p-4 text-mint-green animate-fadeIn">
      {/* Text container with responsive font size and word break */}
      <div
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl break-all"
        style={{ maxWidth: '90vw' }}
      >
        <span>EduardoGuastiOrtiz@portfolio:~$ </span>
        <span>{typedCommand}</span>
        {showCursor && <span className="terminal-cursor"></span>}
      </div>
      {commandFullyTyped && (
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-portfolio-white animate-fadeIn" style={{ animationDelay: '200ms' }}>
          Initializing awesome content...
        </div>
      )}
    </div>
  );
}

export default Terminal;
