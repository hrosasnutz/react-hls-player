import Hls from "hls.js";
import { useCallback, useRef, useState } from "react";
import NativeVideoPlayer from "./players/NativeVideoPlayer";
import HlsVideoPlayer from "./players/HlsVideoPlayer";

function VideoPlayer({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [activeLevel, setActiveLevel] = useState(-1);
  const handleLevels = useCallback((availableLevels) => {
    setLevels(availableLevels);
  }, []);
  const handleActiveLevel = useCallback((level) => {
    setActiveLevel(level);
  }, []);
  const activeQuality = levels.find((level) => level.index === activeLevel);

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
          <HlsVideoPlayer
            playerRef={playerRef}
            url={url}
            selectedLevel={selectedLevel}
            onLevels={handleLevels}
            onActiveLevel={handleActiveLevel}
          ></HlsVideoPlayer>
        ) : (
          <NativeVideoPlayer
            playerRef={playerRef}
            url={url}
          ></NativeVideoPlayer>
        )}
      </div>
      {Hls.isSupported() && (
        <section className="quality-panel" aria-label="Calidad de reproducción">
          <div className="quality-copy">
            <span className="quality-icon" aria-hidden="true">
              <i className="bi bi-display"></i>
            </span>
            <div>
              <label className="quality-label" htmlFor="quality">
                Calidad
              </label>
              <p className="quality-hint">
                {levels.length
                  ? "Elige una resolución o deja que se ajuste automáticamente."
                  : "Buscando resoluciones disponibles..."}
              </p>
            </div>
          </div>
          <div className="quality-picker">
            <select
              id="quality"
              className="form-select quality-select"
              value={selectedLevel}
              disabled={!levels.length}
              onChange={(event) => setSelectedLevel(Number(event.target.value))}
            >
              <option value={-1}>Automática</option>
              {levels.map((level) => (
                <option key={level.index} value={level.index}>
                  {level.height}p ({Math.round(level.bitrate / 1000)} kbps)
                </option>
              ))}
            </select>
            <span className="quality-active" aria-live="polite">
              {activeQuality ? `Activa: ${activeQuality.height}p` : "Esperando video"}
            </span>
          </div>
        </section>
      )}
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
