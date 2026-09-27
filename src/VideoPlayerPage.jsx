import VideoPlayer from "./VideoPlayer";
import VideoStatus from "./VideoStatus";

function VideoPlayerPage({url}) {
    return (
        <main className="player-page">
            <div className="container player-container py-5">
                <header className="player-heading mb-4">
                    <span className="player-kicker">STREAMING PLAYER</span>
                    <h1>React HLS Player</h1>
                    <p>Tu contenido, listo para reproducirse.</p>
                </header>
                <VideoPlayer url={url}></VideoPlayer>
                <VideoStatus></VideoStatus>
            </div>
        </main>
    );
}

export default VideoPlayerPage;