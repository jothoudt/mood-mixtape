import { PlaylistEmbedProps } from './types';

export const PlaylistEmbed: React.FC<PlaylistEmbedProps> = ({ playlistId, url }) => {
  return (
    <div className="mt-6">
      <iframe
        key={playlistId}
        title="Spotify playlist"
        src={url}
        width="100%"
        height="380"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />
    </div>
  );
};

export default PlaylistEmbed;
