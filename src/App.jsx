import VideoPlayerPage from './VideoPlayerPage'

function App() {

  const url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  return (
    <>
      <VideoPlayerPage url={url}></VideoPlayerPage>
    </>
  )
}

export default App
