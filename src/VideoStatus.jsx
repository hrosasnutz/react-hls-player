function VideoStatus() {
  return (
    <div className="player-status d-flex align-items-center gap-2" role="status">
      <i className="bi bi-info-circle" aria-hidden="true"></i>
      <span>La reproducción se controla desde el reproductor.</span>
    </div>
  );
}

export default VideoStatus;
