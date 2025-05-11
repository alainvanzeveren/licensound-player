import React, { useRef, useState } from "react";
import PlayerControls from "./PlayerControls";

const dummyTrack = {
  title: "Test Track",
  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      <h1 style={{ padding: "1rem" }}>Test PlayerControls Layout</h1>
      <PlayerControls
        track={dummyTrack}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={() => alert("Next track")}
        onPrev={() => alert("Previous track")}
        onShuffle={() => setShuffle(!shuffle)}
        shuffle={shuffle}
        audioRef={audioRef}
        onEnded={() => setIsPlaying(false)}
        onVolumeChange={(e) => {
          if (audioRef.current) {
            audioRef.current.volume = parseFloat(e.target.value);
          }
        }}
        buttonColor="#f90"
        volumeSliderColor="#f90"
      />
    </div>
  );
}

export default App;
