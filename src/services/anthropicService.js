import Anthropic from '@anthropic-ai/sdk';
import * as FileSystem from 'expo-file-system';
import { API_KEY } from '../constants/config';

const anthropic = new Anthropic({
  apiKey: API_KEY,
});

export async function analyzeImage(imageUri) {
  const base64Image = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'This image contains a coding question. Please analyze it and provide:\n1. A clear explanation of the problem\n2. A step-by-step solution approach\n3. The complete code solution\n4. Any additional insights or best practices'
        },
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64Image
          }
        }
      ]
    }]
  });

  return response.content[0].text;
}