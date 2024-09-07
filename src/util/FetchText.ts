import { image_prompter_prompt, summarizer_prompt } from "@/constants/prompts";
import { TextGenerationRequest } from "@/models/TextGenerationRequest";
import { MakeRequest } from "./MakeRequest";

const PromptType = {
  SUMMARIZE: summarizer_prompt,
  PROMPT: image_prompter_prompt,
}

export const fetchText = async (prompt: string, model: string = "Meta-Llama-3-8B-Instruct", prompt_type = PromptType.SUMMARIZE ) => {
  const base_url: string = "https://cloud.olakrutrim.com/v1/chat/completions";
  const temperature: number = 1;
  const stop: string = "done";
  const max_tokens: number = 1500;
  
  var messages: object = [
    {
      "role": "system",
      "content": prompt_type
    },
    {
      "role": "user",
      "content": prompt
    }
  ];

  // Generate options object
  var options: TextGenerationRequest = {
    "model": model,
    "messages": messages,
    "max_tokens": max_tokens,
    "temperature": temperature,
    "stop": stop,
  }

  // Make text completion request with constructed options
  const data = await MakeRequest(base_url, options);
  return data;
}