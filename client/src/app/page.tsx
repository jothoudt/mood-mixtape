'use client';

import React from 'react';
import { useLazyGetRecommendationsQuery } from './api/chatgpt';
import MoodInputForm from './components/MoodInputForm/MoodInputForm';
import { Playlist } from './components/Playlist';
import { useSession } from 'next-auth/react';
import { Song } from './components/PlaylistItem';

export default function Home() {
  const [mood, setMood] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string>('');
  const [songs, setSongs] = React.useState<Song[]>([]);
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessToken = (session as any)?.accessToken;

  React.useEffect(() => {
    const saved = localStorage.getItem('moodMixtape:last');
    if (saved) {
      const { mood, genre, songs } = JSON.parse(saved);
      setMood(mood ?? '');
      setGenre(genre ?? '');
      setSongs(songs ?? []);
    }
  }, []);

  const [trigger, { data, isFetching }] = useLazyGetRecommendationsQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim() || !genre.trim()) return;

    try {
      await trigger({ mood, genre }).unwrap();
      if (data && data.length) setSongs(data);
      if (!accessToken) localStorage.setItem('moodMixtape:lastSongs', JSON.stringify({ songs }));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center px-4">
      <main className="w-full max-w-xl bg-surface p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-accent text-center mb-4">MoodMixtape</h1>
        <p className="text-muted text-center mb-8">
          Describe a vibe, pick a genre and we&apos;ll make the playlist.
        </p>
        <MoodInputForm
          genre={genre}
          setGenre={setGenre}
          mood={mood}
          setMood={setMood}
          handleSubmit={handleSubmit}
        />
        {isFetching && <p className="text-sm text-muted text-center">Loading your playlist...</p>}
        {data && data?.length > 0 ? (
          <Playlist songs={data} accessToken={accessToken} />
        ) : (
          <p className="text-center text-xs text-muted">No playlist generated yet.</p>
        )}
      </main>
    </div>
  );
}
