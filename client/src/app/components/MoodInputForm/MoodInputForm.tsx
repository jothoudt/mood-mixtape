import React, { FC } from 'react';
import { MoodInputFormProps } from './types';

const MoodInputForm: FC<MoodInputFormProps> = ({
  genre,
  setGenre,
  mood,
  setMood,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mood" className="block text-sm font-medium mb-2">
            Mood
          </label>
          <input
            id="mood"
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g. chill, aggressive, nostalgic"
            className="w-full p-3 rounded-md bg-surface border border-muted text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium mb-2">
            Genre
          </label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. lofi, k-pop, edm, indie rock"
            className="w-full p-3 rounded-md bg-surface border border-muted text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="
            w-full py-3
            bg-accent text-white font-semibold rounded-md
            shadow-md hover:shadow-lg
            cursor-pointer
            transition-colors duration-200
            hover:bg-pink-500
            hover:scale-[1.01] active:scale-[0.98] transition-transform
          "
        >
          Generate Playlist
        </button>
      </form>
      <div className="mt-6 text-sm text-muted text-center">
        Try: &quot;melancholy + lofi&quot;, &quot;angry + rock&quot;, &quot;blissful +
        synthpop&quot;
      </div>
    </>
  );
};

export default MoodInputForm;
