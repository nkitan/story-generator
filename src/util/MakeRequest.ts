import { ImageGenerationRequest } from "@/models/ImageGenerationRequest";
import { TextGenerationRequest } from "@/models/TextGenerationRequest";

export const MakeRequest = async (base_url: string, options: TextGenerationRequest|ImageGenerationRequest) => {
  var data = undefined;
  data = fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KRUTRIM_AUTH_TOKEN}`,
      },
      body: JSON.stringify(options)
  })
  .then(async (response) => {      
    return response.json();
  })
  .catch(err => {
    console.log("- ERROR: ","Failed To Get Text Completion: ", err);
  })

  return data;
}