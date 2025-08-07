export class PromptTemplateService {
  buildMoodGenrePrompt(mood: string, genre: string): string {
    return `
      You are a music expert and playlist curator.
      Create a list of 10 ${genre.toLowerCase()} songs that match the mood "${mood.toLowerCase()}".

      Foucs on songs that strongly evoke this mood, either through lyrics, vibe, energy or overall feel.
      Avoid repeating the same artist more than once.

      Return the list in this format:
      1. "Song Title" by Artist
      2. "Song Title" by Artist
      ...
    `;
  }
}
