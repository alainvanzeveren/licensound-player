import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TrackList from "./TrackList";
import PlayerControls from "./PlayerControls";
import useTracks from "./hooks/useTracks";
import categories from "./data/categories";

function LicensongLayout() {
  const tracks = useTracks();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = React.useRef(null);

  const filteredTracks = selectedCategory === "All"
    ? tracks
    : tracks.filter((track) => track.category === selectedCategory);

  const currentTrack =
    currentTrackIndex !== null ? filteredTracks[currentTrackIndex] : null;

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!filteredTracks.length) return;
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * filteredTracks.length);
    } else {
      nextIndex =
        currentTrackIndex === null
          ? 0
          : (currentTrackIndex + 1) % filteredTracks.length;
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!filteredTracks.length) return;
    const prevIndex =
      currentTrackIndex === null || currentTrackIndex === 0
        ? filteredTracks.length - 1
        : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#111", color: "white" }}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TrackList
          tracks={filteredTracks}
          currentTrack={currentTrack}
          onSelectTrack={setCurrentTrackIndex}
        />
        <PlayerControls
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onShuffle={handleShuffle}
          shuffle={shuffle}
          audioRef={audioRef}
          onEnded={handleEnded}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default LicensongLayout;