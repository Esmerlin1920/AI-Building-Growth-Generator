import React from 'react';

const BuildingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM7 19h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V9H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg py-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <BuildingIcon />
        <h1 className="text-4xl font-bold tracking-tight text-white">
          AI Building Growth Generator
        </h1>
      </div>
    </header>
  );
};