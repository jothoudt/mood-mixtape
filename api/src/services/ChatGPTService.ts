import OpenAI from 'openai';
import { PromptTemplateService } from './PromptTemplateService';

export class ChatGPTService {
  private openAiClient: OpenAI;

  constructor(
    private promptTemplateService: PromptTemplateService,
    openAiApiKey: string
  ) {
    this.openAiClient = new OpenAI({ apiKey: openAiApiKey });
  }
  async generateTrackList(mood: string, genre: string): Promise<string[]> {
    const response = await this.openAiClient.chat.completions.create({
      model: 'gpt-4-1',
      messages: [
        {
          role: 'user',
          content: this.promptTemplateService.buildMoodGenrePrompt(mood, genre),
        },
      ],
      temperature: 0.8,
    });

    const text = response.choices[0].message.content || '';

    return text
      .split('\n')
      .map((line) => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);
  }
}
