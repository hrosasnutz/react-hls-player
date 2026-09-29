import Hls from "hls.js";
import { useCallback, useRef, useState } from "react";
import NativeVideoPlayer from "./players/NativeVideoPlayer";
import HlsVideoPlayer from "./players/HlsVideoPlayer";
import PlayButton from "./controls/PlayButton";
import QualityDropdown from "./controls/QualityDropdown";
import SoundBar from "./controls/SoundBar";

function VideoPlayer({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // VARIABLES FOR QUALITY CONTROL
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [activeLevel, setActiveLevel] = useState(-1);
  const handleLevels = useCallback((availableLevels) => {
    setLevels(availableLevels);
  }, []);
  const handleActiveLevel = useCallback((level) => {
    setActiveLevel(level);
  }, []);

  function handleQualitySelected(level) {
    setSelectedLevel(level);
  }

  // VARIABLES FOR SOUND CONTROL
  const [soundSelected, setSoundSelected] = useState(1);

  function handleSoundChange(volume) {
    setSoundSelected(volume);
    if (playerRef.current) {
      playerRef.current.volume = volume;
    }
  }

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
            native={false}
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
        <div
          className="player-control-overlay"
          role="group"
          aria-label="Controles del video"
        >
          <div className="player-control-group">
            <PlayButton playing={playing} onPlay={handlePlay}></PlayButton>
            <SoundBar
              soundSelected={soundSelected}
              onSoundChange={handleSoundChange}
            ></SoundBar>
          </div>
          {Hls.isSupported() && (
            <QualityDropdown
              levels={levels}
              activeLevel={activeLevel}
              selectedLevel={selectedLevel}
              onSelectedLevel={handleQualitySelected}
            ></QualityDropdown>
          )}
        </div>
      </div>
    </section>
  );
}

export default VideoPlayer;
