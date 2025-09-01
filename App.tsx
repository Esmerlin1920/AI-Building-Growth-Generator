import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageGrid } from './components/ImageGrid';
import { Spinner } from './components/Spinner';
import { ApiKeyInput } from './components/ApiKeyInput';
import { generateBuildingSequence } from './services/geminiService';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('A futuristic eco-friendly skyscraper with vertical gardens, in a bustling metropolis at sunset.');
  const [numStages, setNumStages] = useState<number>(4);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the API key from localStorage on initial render
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleApiKeySave = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('gemini-api-key', newKey);
  };

  const handleGenerate = useCallback(async (newPrompt: string, newNumStages: number) => {
    if (!apiKey) {
      setError("Please set your Gemini API key before generating images.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setPrompt(newPrompt);
    setNumStages(newNumStages);

    try {
      const images = await generateBuildingSequence(
        apiKey,
        newPrompt,
        newNumStages,
        (message: string) => setLoadingMessage(message)
      );
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-400 mb-8">
            Describe a building and watch it come to life. Our AI will generate images simulating its construction from the ground up.
          </p>
          
          <div className="mb-8">
            <ApiKeyInput currentKey={apiKey} onSave={handleApiKeySave} />
          </div>

          <ImageGeneratorForm
            initialPrompt={prompt}
            initialStages={numStages}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            isApiReady={!!apiKey}
          />
        </div>
        
        {isLoading && (
          <div className="mt-12 text-center">
            <div className="inline-block">
              <Spinner />
            </div>
            <p className="text-xl text-cyan-400 mt-4 animate-pulse">{loadingMessage}</p>
          </div>
        )}

        {error && (
          <div className="mt-12 text-center bg-red-900/50 border border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-red-400">Action Failed</h3>
            <p className="text-red-300 mt-2">{error}</p>
          </div>
        )}

        {!isLoading && generatedImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Construction Sequence</h2>
            <ImageGrid images={generatedImages} />
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500">
        <p>Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
