'use client';

import { FC } from 'react';
import { SongProps } from './types';

const PlaylistItem: FC<SongProps> = ({ index, title, artist }) => {
  return (
    <li className="flex items-center gap-4 px-4 py-3">
      <span className="w-6 text-sm tabular-numbs text-white/60">{index + 1}</span>
      <div className="flex-1">
        <p className="font-medium leading-tight">{title}</p>
        <p className="text-sm text-white/60 leading-tight">{artist}</p>
      </div>
    </li>
  );
};

export default PlaylistItem;
