
import React from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom } from 'react-icons/fa';

const iconClass = "text-orange-400 hover:text-orange-300 transition-colors text-xl";

const PlayerControls = ({ isPlaying, onPlayPause, onSkipBack, onSkipForward, onShuffle }) => {
  return (
    <div className="flex items-center space-x-6">
      <button onClick={onSkipBack} title="Previous">
        <FaBackward className={iconClass} />
      </button>
      <button onClick={onPlayPause} title="Play/Pause">
        {isPlaying ? <FaPause className={iconClass} /> : <FaPlay className={iconClass} />}
      </button>
      <button onClick={onSkipForward} title="Next">
        <FaForward className={iconClass} />
      </button>
      <button onClick={onShuffle} title="Shuffle">
        <FaRandom className={iconClass} />
      </button>
    </div>
  );
};

export default PlayerControls;
