import { Context } from 'koa';
import { Controller } from "../decorators/Controller";
import { Post } from "../decorators/Method";
import { Song } from "../models/songs";
import { SpotifyService } from "../services/SpotifyService";

@Controller('/spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Post('/playlist')
  async createPlaylist(args: { name: string; songs: Song[] }, ctx: Context) {
    const authHeader = ctx.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      ctx.throw(401, 'Missing access token');
    }
    return this.spotifyService.createPlaylist(args.name, args.songs, authHeader.slice(7));
  }
}