import React, { useState, useEffect } from 'react';

const WELCOME_COMMAND = './initialize-portfolio.sh';
const TYPING_SPEED_MS = 80;
const POST_COMMAND_DELAY_MS = 750;

const TerminalIntro = ({ onSequenceComplete }) => {
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
    <>
      {/* This style block contains the animations for the cursor and fade-in effect */}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .terminal-cursor {
            display: inline-block;
            width: 0.6em;
            height: 1.2em;
            background-color: currentColor;
            animation: blink 1s step-end infinite;
            vertical-align: bottom;
            margin-left: 4px;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out forwards;
          }
        `}
      </style>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4 text-cyan-400 animate-fadeIn">
        <div className="text-sm sm:text-base md:text-lg font-mono">
          <span>EduardoGuastiOrtiz@portfolio:~$ </span>
          <span>{typedCommand}</span>
          {showCursor && <span className="terminal-cursor"></span>}
        </div>
        {commandFullyTyped && (
          <div className="mt-4 text-sm text-white animate-fadeIn" style={{ animationDelay: '200ms' }}>
            Initializing awesome content...
          </div>
        )}
      </div>
    </>
  );
}

export default TerminalIntro;