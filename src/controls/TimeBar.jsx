function TimeBar({ time, onTimeChange, duration }) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const currentTime = Number.isFinite(time)
    ? Math.min(Math.max(time, 0), safeDuration)
    : 0;
  const progress = safeDuration > 0 ? (currentTime / safeDuration) * 100 : 0;

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return "0:00";

    const totalSeconds = Math.floor(value);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      return `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`;
    }

    return `${totalMinutes}:${seconds}`;
  }

  return (
    <div className="time-control">
      <label htmlFor="timeBar" className="visually-hidden">
        Posición del video
      </label>
      <input
        id="timeBar"
        type="range"
        className="time-range"
        min={0}
        max={safeDuration}
        step={0.1}
        value={currentTime}
        disabled={safeDuration === 0}
        aria-valuetext={`${formatTime(currentTime)} de ${formatTime(safeDuration)}`}
        style={{ "--time-progress": `${progress}%` }}
        onChange={(event) => onTimeChange(Number(event.target.value))}
      />
      <output className="time-readout" htmlFor="timeBar" aria-hidden="true">
        {formatTime(currentTime)} / {formatTime(safeDuration)}
      </output>
    </div>
  );
}

export default TimeBar;
