import OpenAI from 'openai';
import { PromptTemplateService } from './PromptTemplateService';

export class ChatGPTService {
  private openAiClient: OpenAI;

  constructor(
    openAiApiKey: string,
    private promptTemplateService: PromptTemplateService,
  ) {
    this.openAiClient = new OpenAI({ apiKey: openAiApiKey });
  }
  async generateTrackList(args: {
    mood: string;
    genre: string
  }): Promise<({ title: string; artist: string } | null)[]> {
    const response = await this.openAiClient.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'user',
          content: this.promptTemplateService.buildMoodGenrePrompt(args.mood, args.genre),
        },
      ],
      temperature: 0.8,
    });

    return (response.choices[0].message.content || '')
      .split('\n')
      .map((line) => {
        const normalizedTitle = line.replace(/^\d+\.\s*/, '').trim();
        if (!normalizedTitle) return null;

        const match = normalizedTitle.match(/^"(.*?)"\s+by\s+(.*)$/i);
        if(!match) return null;
        const [, title, artist] = match;
        return { title: title.trim(), artist: artist.trim() }
      })
      .filter(Boolean)
  }
}
