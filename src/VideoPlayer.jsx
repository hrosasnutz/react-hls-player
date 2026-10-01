import Hls from "hls.js";
import { useCallback, useRef, useState } from "react";
import NativeVideoPlayer from "./players/NativeVideoPlayer";
import HlsVideoPlayer from "./players/HlsVideoPlayer";
import PlayButton from "./controls/PlayButton";
import QualityDropdown from "./controls/QualityDropdown";
import SoundBar from "./controls/SoundBar";
import TimeBar from "./controls/TimeBar";

function VideoPlayer({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playFeedback, setPlayFeedback] = useState(null);

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

  // VARIABLES FOR DURATION CONTROL
  const [timeSelected, setTimeSelected] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleTimeChange(time) {
    setTimeSelected(time);
    if(playerRef.current) {
      playerRef.current.currentTime = time;
    }
  }

  async function handlePlay() {
    const video = playerRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
        setPlayFeedback((current) => ({
          action: "play",
          id: (current?.id ?? 0) + 1,
        }));
      } catch (error) {
        console.error("No se pudo iniciar la reproducción:", error);
      }
    } else {
      video.pause();
      setPlaying(false);
      setPlayFeedback((current) => ({
        action: "pause",
        id: (current?.id ?? 0) + 1,
      }));
    }
  }

  function handleLoadedMetadata(event) {
    setDuration(event.currentTarget.duration);
  }

  function handleDurationChange(event) {
    setDuration(event.currentTarget.duration);
  }

  function handleTimeUpdate(event) {
    setTimeSelected(event.currentTarget.currentTime);
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
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleDurationChange}
            onTimeUpdate={handleTimeUpdate}
            onTogglePlay={handlePlay}
          ></HlsVideoPlayer>
        ) : (
          <NativeVideoPlayer
            playerRef={playerRef}
            url={url}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleDurationChange}
            onTimeUpdate={handleTimeUpdate}
            onTogglePlay={handlePlay}
          ></NativeVideoPlayer>
        )}
        {playFeedback && (
          <div
            key={playFeedback.id}
            className="play-feedback"
            aria-hidden="true"
          >
            <i
              className={`bi ${playFeedback.action === "play" ? "bi-play-fill" : "bi-pause-fill"}`}
            ></i>
          </div>
        )}
        <div
          className="player-control-overlay"
          role="group"
          aria-label="Controles del video"
        >
          <TimeBar
            time={timeSelected}
            onTimeChange={handleTimeChange}
            duration={duration}
          ></TimeBar>
          <div className="player-control-row">
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
      </div>
    </section>
  );
}

export default VideoPlayer;
