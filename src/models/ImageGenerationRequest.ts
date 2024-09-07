interface ImageGenerationRequest {
    modelName: string;
    prompt: string;
    imageHeight: number;
    imageWidth: number;
    negativePrompt?: string;
    numOutputImages: number;
    guidanceScale: number;
    numInferenceSteps: number;
    outputImgType: string;
};

export type { ImageGenerationRequest };