'use client';

import { FC } from "react";
import { PlaylistProps } from "./types";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import { useCreateSpotifyPlaylistMutation } from "@/app/api/spotify";
import { PlaylistEmbed } from "../PlaylistEmbed";
import { useSession, signIn } from "next-auth/react";

const Playlist: FC<PlaylistProps> = ({ songs }) => {
  const [createPlaylist, { isLoading, isError, error, data }] = useCreateSpotifyPlaylistMutation();
  const { data: session } = useSession();
  const accessToken = (session as any)?.accessToken;

  const handleCreate = async () => {
    const name = `MoodMixtape • ${new Date().toLocaleDateString()}`;
    try {
      if (!accessToken) {
        await signIn('spotify')
      }
      const res = await createPlaylist({ name, songs, accessToken }).unwrap();
      window.open(res.url, '_blank', 'noopener, noreferrer');
    } catch (e) {
      console.error('Failed to create playlist', e);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Your AI-Curated Playlist
        </h2>
        <button
          onClick={handleCreate}
          disabled={isLoading || songs.length === 0}
          className="rounded-md bg-accent px-4 py-2 text-white transition hover:bg-accent-pink disabled:opacity-60"
        >
          {isLoading ? 'Creating...' : 'Create on Spotify'}
        </button>
      </div>

      {isError && (
        <p className="mb-3 text-sm text-error">
          {(error as any)?.data?.error ?? 'Could not create playlist.'}
        </p>
      )}

      { data && (
        <>
        <p className="mb-3 text-sm text-success">
          Playlist created!{' '}
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Open in spotify
          </a>
        </p>
        <PlaylistEmbed playlistId={data.playlistId} url={data.url} />
        </>
      )}

      <ul className="space-y-3">
        {songs.map((song) => (
          <li key={song.title} className="flex items-center gap-4">
            <PlaylistItem title={song.title} artist={song.artist} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist;