import React from 'react';

interface ImageGridProps {
  images: string[];
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((src, index) => (
        <div key={index} className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105">
          <img src={src} alt={`Stage ${index + 1}`} className="w-full h-auto aspect-square object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <h3 className="text-lg font-bold bg-black/50 px-2 py-1 rounded">Stage {index + 1}</h3>
             <a
                href={src}
                download={`building-stage-${index + 1}.jpeg`}
                className="self-end inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors"
             >
                <DownloadIcon />
                Download
            </a>
          </div>
           <div className="absolute bottom-0 left-0 bg-black/60 px-3 py-1 rounded-tr-lg text-white font-semibold group-hover:opacity-0 transition-opacity">
                Stage {index + 1}
            </div>
        </div>
      ))}
    </div>
  );
};