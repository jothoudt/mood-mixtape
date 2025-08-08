'use client';

import { FC } from "react";
import { PlaylistProps } from "./types";
import PlaylistItem from "../PlaylistItem/PlaylistItem";

const Playlist: FC<PlaylistProps> = ({ songs }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Your AI-Curated Playlist
      </h2>
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