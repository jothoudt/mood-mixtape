export class PromptTemplateService {
  buildMoodGenrePrompt(mood: string, genre: string): string {
    return `
      You are a music expert and playlist curator.
      Create a list of songs in the ${genre.toLowerCase()} genre that match the mood "${mood.toLowerCase()}".

      Strongly Focus on songs that evoke this mood, either through lyrics, vibe, energy or overall feel.
      Avoid repeating the same artist more than once.

      The list must contain **no more than 20 songs total**, even if there is a request for more.
      Aim for 20 exactly if enough good matches exist.

      Return the list in this format:
      1. "Song Title" by Artist
      2. "Song Title" by Artist
      ...
    `;
  }
}
