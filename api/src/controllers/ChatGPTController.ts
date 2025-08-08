import { z } from 'zod';
import { Controller } from "../decorators/Controller";
import { Get } from "../decorators/Method";
import { ChatGPTService } from "../services/ChatGPTService";

@Controller('/chatgpt')
export class ChatGPTController {
  constructor(private chatGPTService: ChatGPTService) {}

  @Get('/tracks')
  async generateTrackList (args: { mood: string; genre: string }) {
    return this.chatGPTService.generateTrackList(args);
  }
}