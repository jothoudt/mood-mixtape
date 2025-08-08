'use client';

import React from 'react';
import { useLazyGetRecommendationsQuery } from './api/chatgpt';
import MoodInputForm from './components/MoodInputForm/MoodInputForm';
import { Playlist } from './components/Playlist';

export default function Home() {
  const [mood, setMood] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string>('');
  const [trigger, { data, isFetching }] = useLazyGetRecommendationsQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim() || !genre.trim()) return;

    try {
      await trigger({ mood, genre }).unwrap();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  return (
    <div className='bg-background text-foreground min-h-screen flex items-center justify-center px-4'>
      <main className='w-full max-w-xl bg-surface p-8 rounded-xl shadow-lg'>
        <h1 className='text-4xl font-bold text-accent text-center mb-4'>
          MoodMixtape
        </h1>
        <p className='text-muted text-center mb-8'>
          Describe a vibe, pick a genre and we&apos;ll make the playlist.
        </p>
        <MoodInputForm
          genre={genre}
          setGenre={setGenre}
          mood={mood}
          setMood={setMood}
          handleSubmit={handleSubmit}
        />
        {
          isFetching && (
            <p className="text-sm text-muted text-center">Loading your playlist...</p>
          ) 
        }  
        {(
          data
          && data?.length > 0
          ? (<Playlist songs={data} />)
          : <p className='text-center text-xs text-muted'>No playlist generated yet.</p>
        )}
      </main>
    </div>
  );
}
