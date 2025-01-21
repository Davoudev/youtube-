import { useEffect, useRef, useState } from "react";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { formatDuration } from "../utils/formatDuration";

type VideoGridItem = {
  id: string;
  title: string;
  channel: {
    name: string;
    id: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};
const VIEW_FORMATER = new Intl.NumberFormat(undefined, { notation: "compact" });
export const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItem) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isPlayingVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlayingVideo]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsPlayingVideo(true)}
      onMouseLeave={() => setIsPlayingVideo(false)}
    >
      <a href={`/watch?v=${id}`} className="aspect-video relative">
        <img
          src={thumbnailUrl}
          className={`block h-full w-full object-cover border-white  transition-[border-radius] duration-200 ${
            isPlayingVideo ? "rounded-none" : "rounded-2xl"
          }`}
        />
        <div className="absolute right-1 bottom-1 bg-white text-sm text-dark-300 px-2 rounded">
          {formatDuration(duration)}
        </div>
        <video
          src={videoUrl}
          className={`block h-full w-full object-cover inset-0 transition-opacity  absolute duration-200 ${
            isPlayingVideo ? "opacity-100 delay-100" : "opacity-0"
          }`}
          ref={videoRef}
          playsInline
          muted
        />
      </a>
      <div className="flex gap-3">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img src={channel.profileUrl} className="w-12 h-12 rounded-full" />
        </a>
        <div className="flex flex-col">
          <a href={`/@${channel.id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-gray-500 text-sm">
            {channel.name}
          </a>
          <div className="text-gray-500 text-sm">
            {VIEW_FORMATER.format(views)} Views •{formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
