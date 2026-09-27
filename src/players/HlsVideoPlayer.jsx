import Hls from "hls.js";
import { useEffect } from "react";

function HlsVideoPlayer({ url, playerRef }) {

  useEffect(() => {
    const videoHtml = playerRef.current;
    if (!videoHtml) return;

    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(videoHtml);

    return () => hls.destroy();

  }, [url, playerRef])

  return (
    <video ref={playerRef} className="player-video" playsInline></video>
  );
}

export default HlsVideoPlayer;
