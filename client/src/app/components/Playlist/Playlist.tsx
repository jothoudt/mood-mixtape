'use client';

import React, { FC } from 'react';
import { PlaylistProps } from './types';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { useCreateSpotifyPlaylistMutation } from '@/app/api/spotify';
import { PlaylistEmbed } from '../PlaylistEmbed';
import { signIn } from 'next-auth/react';

function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'data' in err) {
    const data = (err as { data?: { error?: string } }).data;
    if (data?.error) return data.error;
  }
  return 'Could not create playlist.';
}

const STORAGE_KEY = 'moodMixtape:last';

const Playlist: FC<PlaylistProps> = ({ songs, accessToken }) => {
  const [createPlaylist, { isLoading, isError, error, data }] = useCreateSpotifyPlaylistMutation();

  const handleCreate = async () => {
    const name = `MoodMixtape • ${new Date().toLocaleDateString()}`;
    try {
      if (!accessToken) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored)
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ mood: '', genre: '', songs }));
        await signIn('spotify', { redirect: true, callbackUrl: window.location.href });
        return;
      }
      const res = await createPlaylist({ name, songs, accessToken }).unwrap();
      window.open(res.url, '_blank', 'noopener, noreferrer');
    } catch (e) {
      console.error('Failed to create playlist', e);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
        <h2 className="text-lg font-semibold">Your AI-Curated Playlist</h2>
        <div className="sm-justify-self-end">
          <button
            onClick={handleCreate}
            disabled={isLoading || songs.length === 0}
            className="
              rounded-lg
              bg-green-500
              px-4 py-2
              text-white
              font-semibold
              shadow-md
              hover:bg-green-600
              hover:shadow-lg
              transition
              duration-200
              disabled:opacity50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isLoading ? 'Creating...' : 'Create on Spotify'}
          </button>
        </div>
      </div>

      {isError && <p className="mb-3 text-sm text-error">{getErrorMessage(error)}</p>}

      {data && (
        <>
          <p className="mb-3 text-sm text-success">
            Playlist created!{' '}
            <a href={data.url} target="_blank" rel="noreferrer" className="underline">
              Open in spotify
            </a>
          </p>
          <PlaylistEmbed playlistId={data.playlistId} url={data.url} />
        </>
      )}

      <ul className="mt-4 max-h-64 overflow-y-auto divide-y divide=white/10 rounded-lg bg-white/5">
        {songs.map((song, index) => (
          <PlaylistItem
            key={`${song.title}-${index}`}
            index={index}
            title={song.title}
            artist={song.artist}
          />
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
