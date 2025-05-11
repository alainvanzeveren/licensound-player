import React, { useState, useEffect, useRef } from "react";

const categories = [
  "Background", "Chill", "Chillax beat", "Classical baroque", "Unusual guitar",
  "Classical orchestra", "Classical piano", "Club", "Jazz", "Latin mood",
  "Lounge", "Low lite", "Prestige", "Relax", "Romance", "Shopping",
  "Special", "Vocal pop", "Work café", "Zen",
];

export default function MusicPlayer() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      const filteredTracks = uploadedFiles
        .filter((file) => file.category === selectedCategory)
        .map((file) => file.url);
      const fakeTracks = [
        \`\${selectedCategory}/track1.mp3\`,
        \`\${selectedCategory}/track2.mp3\`,
        \`\${selectedCategory}/track3.mp3\`,
      ];
      const allTracks = [...filteredTracks, ...fakeTracks];
      const shuffledTracks = shuffle
        ? [...allTracks].sort(() => Math.random() - 0.5)
        : allTracks;
      setTrackList(shuffledTracks);
      setCurrentTrack(shuffledTracks[0]);
    }
  }, [selectedCategory, shuffle, uploadedFiles]);

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newUploads = files.map((file) => {
      const url = URL.createObjectURL(file);
      const category = selectedCategory || "Uncategorized";
      return { file, url, category };
    });
    setUploadedFiles((prev) => [...prev, ...newUploads]);
  };

  const handlePrevious = () => {
    const currentIndex = trackList.indexOf(currentTrack);
    const newIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    setCurrentTrack(trackList[newIndex]);
  };

  const handleNext = () => {
    const currentIndex = trackList.indexOf(currentTrack);
    const newIndex = (currentIndex + 1) % trackList.length;
    setCurrentTrack(trackList[newIndex]);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex">
        <div className="w-1/4 bg-black p-4">
          <h2 className="text-xl font-bold mb-4 text-orange-500">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={\`cursor-pointer p-2 rounded-lg \${selectedCategory === category ? "bg-orange-500 text-black" : "hover:bg-gray-800"}\`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-6">Licensound Player</h1>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={\`px-4 py-2 rounded-lg border \${shuffle ? "bg-orange-500 text-black" : "bg-gray-800"}\`}
            >
              {shuffle ? "Shuffle On" : "Shuffle Off"}
            </button>
            <input
              type="file"
              accept="audio/mpeg"
              multiple
              onChange={handleFileUpload}
              className="mt-2 md:mt-0"
            />
          </div>
          {selectedCategory && (
            <div>
              <h2 className="text-xl mb-2">Tracks in {selectedCategory}</h2>
              <ul className="space-y-1 mb-4">
                {trackList.map((track, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer text-orange-300 hover:underline"
                    onClick={() => handleTrackClick(track)}
                  >
                    {track.split("/").pop()}
                  </li>
                ))}
              </ul>
              {currentTrack && (
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <button onClick={handlePrevious} className="text-orange-500 text-2xl">⏮️</button>
                    <audio
                      ref={audioRef}
                      controls
                      autoPlay
                      className="w-full"
                      onEnded={handleEnded}
                    >
                      <source src={currentTrack} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button onClick={handleNext} className="text-orange-500 text-2xl">⏭️</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
