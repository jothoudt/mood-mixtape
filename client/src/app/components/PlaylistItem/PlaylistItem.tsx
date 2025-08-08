'use client';

import { FC } from "react";
import { Song } from "./types";

const PlaylistItem: FC<Song> = ({ title, artist }) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-500">{artist}</p>
    </div>
  );
}

export default PlaylistItem;
