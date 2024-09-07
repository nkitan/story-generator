interface TextGenerationRequest {
    model: string;
    messages: object;
    max_tokens: number;
    stop: string;
    temperature: number;
};

export type { TextGenerationRequest };