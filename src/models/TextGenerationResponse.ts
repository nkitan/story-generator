interface TextGenerationResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
};
  
interface Choice {
  index: number;
  message: Message;
  logprobs: any | null;
  finish_reason: string;
  stop_reason: string | null;
};

interface Message {
  role: string;
  content: string;
};

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type { TextGenerationResponse };
  