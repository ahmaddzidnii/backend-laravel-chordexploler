"use client";

import ReactPlayer from "react-player";

export const ReactPlayerComponent = ({ url }: { url: string }) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <ReactPlayer
        className="absolute top-0 left-0"
        url={url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};
