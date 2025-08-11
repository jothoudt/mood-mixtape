import { env } from '../config/env';
import { PromptTemplateService } from '../services/promptTemplate.service';
import { ChatGPTService } from '../services/chatGPT.service';
import { SpotifyService } from '../services/spotify.service';
import { ChatGPTController } from './chatgpt.controller';
import { SpotifyController } from './spotify.controller';

export { healthController } from './health.controller';

const prompts = new PromptTemplateService();
const chatGPTSvc = new ChatGPTService(env.OPEN_API_KEY, prompts);
const spotifySvc = new SpotifyService(env.SPOTIFY_API_BASE_URL);

export const chatGPTController = new ChatGPTController(chatGPTSvc);
export const spotifyController = new SpotifyController(spotifySvc);
