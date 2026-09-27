import Hls from "hls.js";
import { useRef, useState } from "react";
import NativeVideoPlayer from "./players/NativeVideoPlayer";
import HlsVideoPlayer from "./players/HlsVideoPlayer";

function VideoPlayer({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  async function handlePlay() {
    const video = playerRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch (error) {
        console.error("No se pudo iniciar la reproducción:", error);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="player-card" aria-label="Reproductor de video">
      <div className="player-stage">
        {Hls.isSupported() ? (
          <HlsVideoPlayer playerRef={playerRef} url={url}></HlsVideoPlayer>
        ) : (
          <NativeVideoPlayer
            playerRef={playerRef}
            url={url}
          ></NativeVideoPlayer>
        )}
      </div>
      <div className="player-controls d-flex align-items-center justify-content-between">
        <span className="player-format">
          <i className="bi bi-broadcast" aria-hidden="true"></i>
          <span>Streaming HLS</span>
        </span>
        <button
          className="btn btn-player d-inline-flex align-items-center gap-2"
          onClick={handlePlay}
          aria-label={playing ? "Pausar video" : "Reproducir video"}
        >
          <i
            className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`}
            aria-hidden="true"
          ></i>
          <span>{playing ? "Pausar" : "Reproducir"}</span>
        </button>
      </div>
    </section>
  );
}

export default VideoPlayer;
