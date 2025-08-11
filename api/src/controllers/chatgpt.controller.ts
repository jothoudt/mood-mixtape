import type { Request, Response } from 'express';
import type { TracksInput } from '../types/chatgpt';
import { ChatGPTService } from '../services/chatGPT.service';

export class ChatGPTController {
  constructor(private chatGPTService: ChatGPTService) {}

  async generateTrackList(_req: Request, res: Response) {
    const { mood, genre } = res.locals.input as TracksInput;
    const tracks = await this.chatGPTService.generateTrackList({ mood, genre });
    res.json(tracks);
  }
}
