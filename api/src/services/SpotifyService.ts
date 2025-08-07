export class SpotifyService {
  async createPlaylist(
    _userId: string,
    _title: string,
    _tracks: string[]
  ): Promise<string> {
    return 'test';
  }
}
