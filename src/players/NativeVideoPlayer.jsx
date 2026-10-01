function NativeVideoPlayer({
  url,
  playerRef,
  onLoadedMetadata,
  onDurationChange,
  onTimeUpdate,
  onTogglePlay
}) {
  return (
    <video
      ref={playerRef}
      src={url}
      className="player-video"
      playsInline
      onLoadedMetadata={onLoadedMetadata}
      onDurationChange={onDurationChange}
      onTimeUpdate={onTimeUpdate}
      onClick={onTogglePlay}
    ></video>
  );
}

export default NativeVideoPlayer;
