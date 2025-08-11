import type { Request, Response } from 'express';
import type { CreatePlaylistInput } from '../types/playlist';
import { SpotifyService } from '../services/spotify.service';

function bearer(req: Request): string | null {
  const h = req.headers.authorization;
  const m = h?.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  async createPlaylist(req: Request, res: Response) {
    const token = bearer(req);
    if (!token) return res.status(401).json({ error: 'Missing access token' });
    const { name, songs } = res.locals.input as CreatePlaylistInput;
    const out = await this.spotifyService.createPlaylist(name, songs, token);
    res.json(out);
  }
}
