import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface ImageGeneratorFormProps {
  initialPrompt: string;
  initialStages: number;
  onSubmit: (prompt: string, numStages: number) => void;
  isLoading: boolean;
  isApiReady: boolean;
}

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({
  initialPrompt,
  initialStages,
  onSubmit,
  isLoading,
  isApiReady,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [numStages, setNumStages] = useState(initialStages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiReady) return;
    onSubmit(prompt, numStages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/60 p-8 rounded-xl shadow-2xl border border-gray-700">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Building Description
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
          placeholder="e.g., A modern glass skyscraper in a bustling city"
          required
          disabled={isLoading || !isApiReady}
        />
      </div>

      <div>
        <label htmlFor="stages" className="block text-sm font-medium text-gray-300 mb-2">
          Number of Construction Stages: <span className="font-bold text-cyan-400">{numStages}</span>
        </label>
        <input
          id="stages"
          type="range"
          min="2"
          max="10"
          value={numStages}
          onChange={(e) => setNumStages(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg disabled:opacity-50"
          disabled={isLoading || !isApiReady}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt || !isApiReady}
        title={!isApiReady ? 'API Key is not configured. Generation is disabled.' : 'Generate Building Growth'}
        className="w-full flex justify-center items-center gap-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Generating...</span>
          </>
        ) : (
          <span>Generate Building Growth</span>
        )}
      </button>
    </form>
  );
};