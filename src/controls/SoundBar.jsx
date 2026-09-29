function SoundBar({ soundSelected, onSoundChange }) {
  const volume = Math.min(1, Math.max(0, Number(soundSelected) || 0));
  const volumePercent = Math.round(volume * 100);

  return (
    <div
      className="sound-control"
      style={{ "--volume-progress": `${volumePercent}%` }}
    >
      <i
        className={`bi ${volume === 0 ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`}
        aria-hidden="true"
      ></i>
      <label htmlFor="soundBar" className="visually-hidden">
        Volumen
      </label>
      <input
        id="soundBar"
        type="range"
        className="sound-range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(event) => onSoundChange(Number(event.target.value))}
      />
      <output className="sound-value" htmlFor="soundBar" aria-hidden="true">
        {volumePercent}%
      </output>
    </div>
  );
}

export default SoundBar;
