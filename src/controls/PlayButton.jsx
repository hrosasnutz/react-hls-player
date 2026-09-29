function PlayButton({ playing, onPlay }) {
  return (
    <button
      type="button"
      className="player-icon-button"
      onClick={onPlay}
      aria-label={playing ? "Pausar video" : "Reproducir video"}
      title={playing ? "Pausar" : "Reproducir"}
    >
      <i
        className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`}
        aria-hidden="true"
      ></i>
    </button>
  );
}

export default PlayButton;
