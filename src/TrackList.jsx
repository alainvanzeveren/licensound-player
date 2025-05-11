
import React from 'react';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const TrackList = ({ tracks, currentIndex, timeLeft }) => {
  return (
    <div className="flex flex-col space-y-2">
      {tracks.map((track, index) => (
        <div
          key={track.id || index}
          className={\`flex justify-between items-center px-4 py-2 rounded-md transition-all
            \${index === currentIndex ? 'bg-orange-500 text-black font-semibold' : 'hover:bg-neutral-800'}\`}
        >
          <span>{track.title || \`Track \${index + 1}\`}</span>
          <span className="tabular-nums">
            {index === currentIndex && timeLeft != null
              ? formatTime(timeLeft)
              : formatTime(track.duration || 180)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
