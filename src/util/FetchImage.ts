import { ImageGenerationRequest } from "@/models/ImageGenerationRequest";
import { MakeRequest } from "./MakeRequest";

export const fetchImage = async (prompt: string, nprompt: string = "", resolution: {x: number, y: number} = {x: 576, y: 1024}) => {
    const base_url: string = "https://cloud.olakrutrim.com/v1/images/generations/diffusion";
    const model: string = "diffusion1XL"
    const images: number = 1;
    const guidanceScale: number = 10;
    const numInferenceSteps: number = 50;
    const outputImgType: string = "pil";

    // Generate options object
    var options: ImageGenerationRequest = {
        "modelName": model,
        "prompt": prompt,
        "imageHeight": resolution.x, 
        "imageWidth": resolution.y, 
        "numOutputImages": images,
        "guidanceScale": guidanceScale,
        "numInferenceSteps": numInferenceSteps,
        "outputImgType": outputImgType
    }

    // Add negative prompt if provided
    if(nprompt.length && nprompt.length != 0){
        options.negativePrompt = nprompt;
    }

    // Make request
    const data = await MakeRequest(base_url, options)
    return data;
}