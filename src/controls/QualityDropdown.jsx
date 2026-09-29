function QualityDropdown({levels, activeLevel, selectedLevel, onSelectedLevel}) {

  const activeQuality = levels.find((level) => level.index === activeLevel);
  
  return (
    <div className="quality-control">
      <i className="bi bi-gear-fill" aria-hidden="true"></i>
      <label className="visually-hidden" htmlFor="quality">
        Calidad de reproducción
      </label>
      <select
        id="quality"
        className="quality-select"
        value={selectedLevel}
        disabled={!levels.length}
        onChange={(event) => onSelectedLevel(Number(event.target.value))}
      >
        <option value={-1}>Automática</option>
        {levels.map((level) => (
          <option key={level.index} value={level.index}>
            {level.height}p ({Math.round(level.bitrate / 1000)} kbps)
          </option>
        ))}
      </select>
      <span className="quality-active" aria-live="polite">
        {activeQuality ? `${activeQuality.height}p` : ""}
      </span>
    </div>
  );
}

export default QualityDropdown;
