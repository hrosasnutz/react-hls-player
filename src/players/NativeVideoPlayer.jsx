function NativeVideoPlayer({ url, playerRef }) {
  return (
    <video ref={playerRef} src={url} className="player-video" playsInline></video>
  );
}

export default NativeVideoPlayer;
