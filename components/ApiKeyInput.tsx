import React, { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  currentKey: string;
  onSave: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ currentKey, onSave }) => {
  const [inputValue, setInputValue] = useState(currentKey);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    // Sync local state if the prop changes (e.g., from localStorage on initial load)
    setInputValue(currentKey);
  }, [currentKey]);

  const handleSave = () => {
    onSave(inputValue);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="bg-gray-800/60 p-6 rounded-xl shadow-2xl border border-gray-700">
      <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-2">
        Gemini API Key
      </label>
      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <input
            id="api-key"
            type={isPasswordVisible ? 'text' : 'password'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm p-3 pr-10 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Enter your API key here"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
            aria-label={isPasswordVisible ? 'Hide API key' : 'Show API key'}
          >
            {isPasswordVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.477 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM10 12a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" /><path d="M10 17a7 7 0 01-7-7c0-1.933 1.002-3.734 2.573-4.95l-1.293-1.293A1 1 0 013 2.293l1.293 1.293A9.97 9.97 0 0110 1c4.477 0 8.268 2.943 9.542 7 .255.833.255 1.727 0 2.56A9.97 9.97 0 0110 17z" /></svg>
            )}
          </button>
        </div>
        <button
          onClick={handleSave}
          disabled={!inputValue || inputValue === currentKey}
          className="flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md shadow-lg transition-colors"
        >
          {hasSaved ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          ) : 'Save'}
        </button>
      </div>
       <p className="text-xs text-gray-500 mt-3">
        Your API key is stored in your browser's local storage and is not sent to any server except Google's.
      </p>
    </div>
  );
};
