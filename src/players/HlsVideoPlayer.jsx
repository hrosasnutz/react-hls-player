import Hls from "hls.js";
import { useEffect, useRef } from "react";

function HlsVideoPlayer({
  url,
  playerRef,
  onLevels,
  onActiveLevel,
  selectedLevel,
}) {
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    //if (video.canPlayType("application/vnd.apple.mpegurl")) {
      //video.src = url;
      //return;
    //}

    const hls = new Hls();
    hlsRef.current = hls;
    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      onLevels(
        hls.levels.map((level, index) => ({
          index,
          height: level.height,
          bitrate: level.bitrate,
        })),
      );
    });

    hls.on(Hls.Events.LEVEL_SWITCHED, (_, d) => {
      onActiveLevel(d.level);
    });

    return () => {
      hlsRef.current = null;
      hls.destroy();
    };
  }, [url, playerRef, onLevels, onActiveLevel]);

  useEffect(() => {
    if (hlsRef.current?.levels.length) {
      hlsRef.current.currentLevel = selectedLevel;
    }
  }, [selectedLevel]);

  return <video ref={playerRef} className="player-video" playsInline></video>;
}

export default HlsVideoPlayer;
