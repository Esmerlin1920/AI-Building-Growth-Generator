import { GoogleGenAI } from "@google/genai";

const CONSTRUCTION_PHASES: string[] = [
  "in an empty lot before construction, site cleared for development.",
  "at the very beginning of construction, with heavy machinery doing excavation and foundation work.",
  "with the foundational structure and the first few floors' framework being erected.",
  "with the core structure and steel or concrete framework about one-third complete.",
  "with the structural frame halfway to its full height, showing significant progress.",
  "as the main structural frame reaches its full height, topping out.",
  "with the exterior cladding and glass facade being installed on the lower half of the building.",
  "with most of the exterior facade complete, and large cranes still attached to the top.",
  "nearing completion, with exterior work finished and interior work underway, landscaping begins at the base.",
  "fully completed, newly finished, and shining, ready for its grand opening.",
];

/**
 * Generates a modified prompt for a specific stage of construction.
 * @param basePrompt The user's initial description of the building.
 * @param currentStage The current stage number (0-indexed).
 * @param totalStages The total number of stages to generate.
 * @returns A detailed prompt for the specific construction stage.
 */
const getStagePrompt = (basePrompt: string, currentStage: number, totalStages: number): string => {
  if (totalStages <= 1) {
    return `${basePrompt}, ${CONSTRUCTION_PHASES[CONSTRUCTION_PHASES.length - 1]}`;
  }
  
  // Distribute the requested stages across the available phase descriptions
  const phaseIndex = Math.round((currentStage / (totalStages - 1)) * (CONSTRUCTION_PHASES.length - 1));
  const selectedPhase = CONSTRUCTION_PHASES[phaseIndex];
  
  return `${basePrompt}, ${selectedPhase} Photorealistic, high-resolution, detailed architecture.`;
};


/**
 * Generates a sequence of images representing a building's construction.
 * @param apiKey The user's Gemini API key.
 * @param basePrompt The user's description of the building.
 * @param numStages The number of construction stages to generate.
 * @param onProgress A callback function to report progress.
 * @returns A promise that resolves to an array of base64 image data URLs.
 */
export const generateBuildingSequence = async (
  apiKey: string,
  basePrompt: string,
  numStages: number,
  onProgress: (message: string) => void
): Promise<string[]> => {
  if (!apiKey) {
    throw new Error("API Key is not provided. Please set it in the application.");
  }

  // Initialize the AI client on-demand with the provided key for security.
  const ai = new GoogleGenAI({ apiKey });
    
  const images: string[] = [];

  for (let i = 0; i < numStages; i++) {
    const stagePrompt = getStagePrompt(basePrompt, i, numStages);
    onProgress(`Generating stage ${i + 1} of ${numStages}...`);
    
    try {
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: stagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        images.push(`data:image/jpeg;base64,${base64ImageBytes}`);
      } else {
        throw new Error(`Image generation failed for stage ${i + 1}. The model did not return an image.`);
      }
    } catch (error) {
       console.error(`Error during image generation for stage ${i + 1}:`, error);
       // Rethrow a more user-friendly error
       throw new Error(`Failed to generate image for stage ${i + 1}. Please try again or modify your prompt. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  onProgress('All stages generated successfully!');
  return images;
};
